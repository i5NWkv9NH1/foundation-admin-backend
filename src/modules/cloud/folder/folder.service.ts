import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { existsSync, mkdirSync, rmdirSync } from 'fs'
import { AccountService } from 'src/system/account/account.service'
import { Repository } from 'typeorm'
import { File } from '../file/entities/file.entity'
import { FileStorageService } from '../file/file-storage.service'
import { Folder } from './entities/folder.entity'

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly accountService: AccountService,
    private readonly fileStorageService: FileStorageService
  ) {}

  async createFolder(name: string, accountId: string): Promise<Folder> {
    const account = await this.accountService.findOne(accountId)

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    // 生成文件夹的相对路径
    const relativePath = this.generateRelativePath(account.username, name)

    // 生成文件夹路径
    const folderPath = this.fileStorageService.getRelativePath(relativePath)

    // 检查文件系统中是否存在同名文件夹
    if (existsSync(folderPath)) {
      throw new BadRequestException(
        'A folder with the same name already exists in the file system'
      )
    }

    // 创建文件夹
    try {
      mkdirSync(folderPath, { recursive: true })
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create folder on the filesystem'
      )
    }

    // 创建数据库中的文件夹记录
    const folder = this.folderRepository.create({ name, account, relativePath })
    return await this.folderRepository.save(folder)
  }

  async deleteFolder(
    folderId: string,
    deleteFiles: boolean = false
  ): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['files']
    })

    if (!folder) {
      throw new NotFoundException('Folder not found')
    }

    if (deleteFiles) {
      for (const file of folder.files) {
        file.isDeleted = true
        await this.fileRepository.save(file)
      }
    }

    // 删除文件系统中的文件夹
    const folderPath = this.fileStorageService.getRelativePath(
      folder.relativePath
    )
    try {
      rmdirSync(folderPath, { recursive: true })
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to remove folder from the filesystem'
      )
    }

    await this.folderRepository.remove(folder)
  }

  async shareFolderWithAccount(
    folderId: string,
    accountId: string
  ): Promise<void> {
    const folder = await this.folderRepository.findOne({
      where: { id: folderId },
      relations: ['sharedAccounts']
    })
    const account = await this.accountService.findOne(accountId)

    if (folder && account) {
      folder.sharedAccounts.push(account)
      await this.folderRepository.save(folder)
    }
  }

  async findOne(id: string) {
    return await this.folderRepository.findOne({ where: { id } })
  }

  async findOneByAccountAndFolderId(accountId: string, folderId: string) {
    return this.folderRepository.findOne({
      where: {
        id: folderId,
        account: { id: accountId }
      }
    })
  }

  private generateRelativePath(
    accountUsername: string,
    folderName: string
  ): string {
    return `${accountUsername}/${folderName}`
  }
}

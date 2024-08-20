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

  async createFolder(
    name: string,
    accountId: string,
    thumbnailUrl?: string,
    description?: string
  ): Promise<Folder> {
    const account = await this.accountService.findOne(accountId)

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    const relativePath = this.generateRelativePath(account.username, name)
    const folderPath = this.fileStorageService.getRelativePath(relativePath)

    if (existsSync(folderPath)) {
      throw new BadRequestException(
        'A folder with the same name already exists in the file system'
      )
    }

    try {
      mkdirSync(folderPath, { recursive: true })
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create folder on the filesystem'
      )
    }

    const folder = this.folderRepository.create({
      name,
      account,
      relativePath,
      thumbnailUrl, // 存储封面图片URL
      description // 存储文件夹描述
    })

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

  private generateRelativePath(accountId: string, folderId: string): string {
    return `${accountId}/${folderId}`
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs/promises'
import * as path from 'path'
import { AccountService } from 'src/system/account/account.service'
import { Repository } from 'typeorm'
import { FolderService } from '../folder/folder.service'
import { UploadFileDto } from './dto/upload-file.dto'
import { File } from './entities/file.entity'
import { FileStorageService } from './file-storage.service'

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    private readonly fileStorageService: FileStorageService,
    private readonly accountService: AccountService,
    private readonly folderService: FolderService
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    uploadFileDto: UploadFileDto
  ): Promise<string> {
    const { folderId, accountId } = uploadFileDto
    const account = await this.accountService.findOne(accountId)
    const folder = await this.folderService.findOne(folderId)

    const relativePath = `${account.username}/${folder.name}`
    const storageDir = this.fileStorageService.getRelativePath(relativePath)
    const storagePath = path.join(storageDir, file.originalname)

    try {
      // 确保目录存在
      await fs.mkdir(storageDir, { recursive: true })

      // 写入文件
      await fs.writeFile(storagePath, file.buffer)

      // 保存到数据库
      const newFile = this.fileRepository.create({
        filename: file.originalname,
        path: path.join(relativePath, file.originalname),
        mimetype: file.mimetype,
        size: file.size,
        account,
        folder
      })

      await this.fileRepository.save(newFile)

      // 返回文件的绝对 URL
      return this.fileStorageService.getFileUrl(
        path.join(relativePath, file.originalname)
      )
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`)
    }
  }
}

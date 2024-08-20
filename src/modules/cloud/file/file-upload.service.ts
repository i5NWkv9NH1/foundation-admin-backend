import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { createHash } from 'crypto'
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
  ): Promise<File> {
    const { folderId, accountId } = uploadFileDto
    const account = await this.accountService.findOne(accountId)
    const folder = await this.folderService.findOne(folderId)

    if (!account || !folder) {
      throw new BadRequestException('Invalid account or folder')
    }

    const md5 = this.calculateMD5(file.buffer)
    const existingFile = await this.fileRepository.findOne({
      where: { md5, account, isDeleted: false }
    })
    if (existingFile) {
      throw new BadRequestException(
        `File with the same content already exists: ${existingFile.filename}`
      )
    }

    const relativePath = `${account.id}/${folder.id}`
    const storageDir = this.fileStorageService.getRelativePath(relativePath)
    const storagePath = path.join(storageDir, file.originalname)

    try {
      await fs.mkdir(storageDir, { recursive: true })
      await fs.writeFile(storagePath, file.buffer)
      const newFile = this.fileRepository.create({
        filename: file.originalname,
        path: path.join(relativePath, file.originalname),
        mimetype: file.mimetype,
        md5,
        size: file.size,
        account,
        folder
      })
      return await this.fileRepository.save(newFile)
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`)
    }
  }
  private calculateMD5(buffer: Buffer): string {
    return createHash('md5').update(buffer).digest('hex')
  }
}

import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { promises as fs } from 'fs'
import * as path from 'path'
import { CDN } from 'src/system/cdn/entities/cdn.entity' // Adjust path as needed
import { Repository } from 'typeorm'

@Injectable()
export class UploadService {
  private readonly uploadPath: string
  private readonly cdnPrefix: string

  constructor(
    @InjectRepository(CDN)
    private readonly cdnRepository: Repository<CDN>,
    private readonly configService: ConfigService
  ) {
    this.uploadPath = this.configService.get<string>('UPLOAD_PATH') || 'uploads'
    this.cdnPrefix =
      this.configService.get<string>('CDN_PREFIX') || 'http://localhost:3000'
  }

  async uploadFile(file: Express.Multer.File, type: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }

    // Save file to local storage and get the URL
    const fileUrl = await this.storeFile(file, type)

    // Return the CDN-prefixed URL
    return fileUrl
  }

  private async storeFile(
    file: Express.Multer.File,
    type: string
  ): Promise<string> {
    const cdn = await this.cdnRepository.findOne({ where: { name: type } })
    if (!cdn) {
      throw new BadRequestException('CDN type not found')
    }

    const { originalname, buffer } = file
    const filePath = path.join(this.uploadPath, originalname)

    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    // Save file to local storage
    await fs.writeFile(filePath, buffer)

    // Generate CDN URL
    return `${cdn.baseUrl}/${originalname}`
  }
}

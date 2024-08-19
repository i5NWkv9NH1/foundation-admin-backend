import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { cwd } from 'process'

@Injectable()
export class FileStorageService {
  // * business cloud
  private readonly baseStoragePath: string
  // * url for business cloud
  private readonly storageUrl: string
  private readonly logger = new Logger(FileStorageService.name)

  constructor(private readonly configService: ConfigService) {
    // 从 env 获取相对路径配置
    const uploadPath = this.configService.get<string>('UPLOAD_PATH')
    const relativePath = this.configService.get<string>(
      'CLOUD_STORAGE_RELATIVE_PATH'
    )
    if (!relativePath) {
      throw new InternalServerErrorException(
        'CLOUD_STORAGE_RELATIVE_PATH is not defined in the environment variables'
      )
    }
    this.baseStoragePath = join(cwd(), uploadPath, relativePath)
    this.storageUrl = `http://localhost:3200/${uploadPath}/${relativePath}`

    if (!this.storageUrl) {
      throw new InternalServerErrorException(
        'CLOUD_STORAGE_PATH is not defined in the environment variables'
      )
    }
  }

  // 获取存储在服务器上的相对路径
  getRelativePath(subPath: string): string {
    return join(this.baseStoragePath, subPath)
  }

  // 获取文件的绝对 URL
  getFileUrl(relativePath: string): string {
    return `${this.storageUrl}/${relativePath}`
  }
}

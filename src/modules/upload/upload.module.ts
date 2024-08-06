import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CDN } from 'src/system/cdn/entities/cdn.entity'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  imports: [TypeOrmModule.forFeature([CDN])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}

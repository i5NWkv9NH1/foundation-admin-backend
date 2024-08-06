import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CDNController } from './cdn.controller'
import { CDNService } from './cdn.service'
import { CDN } from './entities/cdn.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CDN])],
  providers: [CDNService],
  controllers: [CDNController],
  exports: [CDNService] // Exporting the service if needed in other modules
})
export class CDNModule {}

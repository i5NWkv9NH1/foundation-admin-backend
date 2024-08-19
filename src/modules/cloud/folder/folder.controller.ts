import { Body, Delete, Param, Post, Query } from '@nestjs/common'
import { CloudController } from 'src/common/decorators'
import { FolderService } from './folder.service'

@CloudController('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(
    @Body('name') name: string,
    @Body('accountId') accountId: string
  ) {
    return this.folderService.createFolder(name, accountId)
  }

  @Delete(':id')
  async deleteFolder(
    @Param('id') folderId: string,
    @Query('deleteFiles') deleteFiles: boolean = false
  ) {
    return this.folderService.deleteFolder(folderId, deleteFiles)
  }
}

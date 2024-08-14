import { SystemController } from 'src/shared/decorators'
import { BaseController } from 'src/shared/providers/base.controller'
import { ActionService } from './action.service'
import { Action } from './entities/action.entity'

@SystemController('actions')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class ActionController extends BaseController<Action> {
  constructor(private readonly actionService: ActionService) {
    super(actionService)
  }
}

import { BaseController } from 'src/shared/providers/base.controller'
import { ActionsService } from './actions.service'
import { Action } from './entities/action.entity'
import { SystemController } from 'src/shared/decorators'

@SystemController('actions')
export class ActionsController extends BaseController<Action> {
  constructor(private readonly actionsService: ActionsService) {
    super(actionsService)
  }
}

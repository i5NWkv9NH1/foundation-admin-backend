import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Actions } from 'src/shared/decorators'
import { AccountService } from 'src/system/account/account.service'

/**
 * @see {Actions}
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountService: AccountService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )
    if (isPublic) {
      return true
    }

    const requiredActions = this.reflector.get<string[]>(
      'actions',
      context.getHandler()
    )
    if (!requiredActions) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const accountId = request.account?.id
    if (!accountId) {
      throw new ForbiddenException('No account ID found in request')
    }

    const allowedActions = await this.accountService.getAllowActions(accountId)
    const hasPermission = requiredActions.every((action) =>
      allowedActions.includes(action)
    )

    if (!hasPermission) {
      throw new ForbiddenException('Access denied: insufficient permissions')
    }

    return hasPermission
  }
}

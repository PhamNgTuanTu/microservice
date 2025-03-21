import BaseRouter from '@app/common/router/base.router'
import UserController from './user.controller'

class UserRouter extends BaseRouter {
  controller = UserController

  initialize() {
    this.get('/', this.controller.list)
    // this.get('/:id', this.controller.read)
    // this.post('/', this.controller.create)
    // this.put('/:id', this.controller.update)
    // this.delete('/:id', this.controller.delete)
  }
}

export default new UserRouter().router
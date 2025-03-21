import BaseRouter from "../../../commons/router/base.router";
import CheckController from './check.controller'

class CheckRouter extends BaseRouter {
  controller = CheckController

  initialize() {
    this.get('/health', this.controller.checkHealth)
  }
}

export default new CheckRouter().router

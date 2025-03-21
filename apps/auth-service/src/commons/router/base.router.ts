import express, { Router } from 'express'
import { asyncHandler } from '../middlewares/async.middlewares'

export default abstract class BaseRouter {
  controller: any
  private _router: Router

  public get router(): Router {
    this.initialize()
    return this._router
  }
  
  constructor() {
    this._router = express.Router({ mergeParams: true })
  }

  abstract initialize(): void

  get(path: string, fn: Function, ...middlewares: any[]) {
    this._router.get(path, middlewares, asyncHandler(fn.bind(this.controller)))
  }

  post(path: string, fn: Function, ...middlewares: any[]) {
    this._router.post(path, middlewares, asyncHandler(fn.bind(this.controller)))
  }

  put(path: string, fn: Function, ...middlewares: any[]) {
    this._router.put(path, middlewares, asyncHandler(fn.bind(this.controller)))
  }

  delete(path: string, fn: Function, ...middlewares: any[]) {
    this._router.delete(path, middlewares, asyncHandler(fn.bind(this.controller)))
  }
}

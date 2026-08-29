import { Router as ExpressRouter } from 'express';
import { Logger } from './Logger';

export class Router {
  private static registeredRoutes: { method: string; path: string; handlerName: string }[] = [];

  public static mount(mainRouter: ExpressRouter): void {
    Logger.info(`Mounted ${this.registeredRoutes.length} route endpoints into Express Router.`);
  }

  public static register(method: string, path: string, handlerName: string): void {
    this.registeredRoutes.push({ method, path, handlerName });
  }

  public static getRouteRegistry() {
    return [...this.registeredRoutes];
  }
}

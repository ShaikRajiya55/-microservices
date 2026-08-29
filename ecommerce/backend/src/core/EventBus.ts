import { Logger } from './Logger';

export type EventHandler<T = any> = (payload: T) => Promise<void> | void;

export class EventBus {
  private static instance: EventBus;
  private handlers: Map<string, EventHandler[]> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe<T>(eventName: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
    Logger.debug(`Subscribed to event: ${eventName}`);
  }

  public async publish<T>(eventName: string, payload: T): Promise<void> {
    Logger.info(`Publishing event: ${eventName}`, { payload });
    const eventHandlers = this.handlers.get(eventName) || [];
    for (const handler of eventHandlers) {
      try {
        await handler(payload);
      } catch (err) {
        Logger.error(`Error handling event ${eventName}`, err);
      }
    }
  }
}

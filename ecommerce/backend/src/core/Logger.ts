export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  public static info(message: string, context?: Record<string, any>): void {
    console.log(`[${this.getTimestamp()}] [INFO] ${message}`, context ? JSON.stringify(context) : '');
  }

  public static warn(message: string, context?: Record<string, any>): void {
    console.warn(`[${this.getTimestamp()}] [WARN] ${message}`, context ? JSON.stringify(context) : '');
  }

  public static error(message: string, error?: any, context?: Record<string, any>): void {
    console.error(`[${this.getTimestamp()}] [ERROR] ${message}`, error || '', context ? JSON.stringify(context) : '');
  }

  public static debug(message: string, context?: Record<string, any>): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`, context ? JSON.stringify(context) : '');
    }
  }
}

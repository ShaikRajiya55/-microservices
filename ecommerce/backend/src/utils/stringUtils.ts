export class StringUtils {
  public static slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  public static generateOrderNumber(): string {
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${dateStr}-${randomHex}`;
  }

  public static sanitizeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

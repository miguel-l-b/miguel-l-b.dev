export class CacheDB {
  private static cache: Record<string, any> = {}

  public static getByKey<T>(key: string): T {
    return this.cache[key]
  }

  public static set<T>(key: string, value: T) {
    this.cache[key] = value
  }

  public static getWithPrefix<T>(prefix: string): T[] {
    return this.getKeysWithPrefix(prefix).map((e) => this.cache[e])
  }

  public static getKeysWithPrefix(prefix: string): string[] {
    return this.keys().filter((e) => e.startsWith(prefix))
  }

  public static async delete(key: string) {
    delete this.cache[key]
  }

  public static keys(): string[] {
    return Object.keys(this.cache)
  }

  public static async clear() {
    this.cache = {}
  }
}

import * as bcrypt from 'bcrypt';

export class HashUtil {
  private static readonly SALT_ROUNDS = 10;

  static async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  static async verify(hash: string, plainText: string): Promise<boolean> {
    try {
      if (!hash || !plainText) return false;
      return await bcrypt.compare(plainText, hash);
    } catch {
      return false;
    }
  }
}

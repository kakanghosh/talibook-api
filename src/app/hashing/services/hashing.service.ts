import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async generateHash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainText, salt);
  }

  async matchHash(plainText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }
}

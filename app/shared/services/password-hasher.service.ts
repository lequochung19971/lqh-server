import * as crypto from 'crypto';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';

export class PasswordHasherService {
  constructor() {}

  protected generateSalt(rounds?: number): string {
    if (rounds >= 15) {
      throw new Error(`${rounds} is greater than 15,Must be less that 15`);
    }
    if (typeof rounds !== 'number') {
      throw new Error('rounds param must be a number');
    }

    rounds = rounds ?? 12;
    // let temp = crypto
    //   .randomBytes(Math.ceil(rounds / 2))
    //   .toString('hex')
    //   .slice(0, rounds);
    // console.log(temp);
    return crypto
      .randomBytes(Math.ceil(rounds / 2))
      .toString('hex')
      .slice(0, rounds);
  }

  protected hasher(password: string, salt: string): IPasswordHashing {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let hashedPassword = hash.digest('hex');
    return { salt, hashedPassword } as IPasswordHashing;
  }

  protected hash(password: string, salt: string): IPasswordHashing {
    if (password == null || salt == null) {
      throw new Error('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
      throw new Error(
        'password must be a string and salt must either be a salt string or a number of rounds'
      );
    }

    return this.hasher(password, salt);
  }

  compare(password: string, hash: IPasswordHashing): boolean {
    if (password == null || hash == null) {
      throw new Error('password and hash is required to compare');
    }
    if (typeof password !== 'string' || typeof hash !== 'object') {
      throw new Error('password must be a String and hash must be an Object');
    }
    let passwordHashing = this.hasher(password, hash.salt);
    if (passwordHashing.hashedPassword === hash.hashedPassword) {
      return true;
    }
    return false;
  }

  createNewHashingPassword(password: string): IPasswordHashing {
    return this.hash(password, this.generateSalt(12));
  }
}

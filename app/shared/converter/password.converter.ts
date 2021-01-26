import { Converter } from "@automapper/types";
import { PasswordHasherService } from '../services/password-hasher.service';
import { IPasswordHashing } from '../../providers/interface/password-hashing.interface';

const passwordHasherService = new PasswordHasherService();

export const passwordConverted: Converter<string, IPasswordHashing> = {
  convert(password: string): IPasswordHashing {
    if (!password) {
      return;
    }

    return passwordHasherService.createNewHashingPassword(password);
  }
}
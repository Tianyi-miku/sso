import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";
import { passwordConstants } from "./constants";

@Injectable()
export class CryptoService {

  constructor(
    private configService: ConfigService,
  ) { }

  //加密
  async careatePassword(password: string): Promise<string> {

    const hmac = crypto.createHmac('sha256', passwordConstants.secret);
    hmac.update(password);
    return hmac.digest('hex');
  }

  //验证密码
  async checkPassword(password: string, hash_password: string): Promise<boolean> {

    //先对需要验证的密码进行加密
    password = await this.careatePassword(password);

    return password === hash_password;
  }
}
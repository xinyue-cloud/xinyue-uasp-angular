import { Injectable } from '@angular/core';
import * as cryptoJs  from 'crypto-js';
//import * as Base64     from 'crypto-js/enc-base64';
//import * as Utf8       from 'crypto-js/enc-utf8';
//import * as HmacSHA256 from 'crypto-js/hmac-sha256';

@Injectable({
  providedIn: 'root',
})
export class KuJwtService {

  private readonly secretKey = 'B4D245401C8846C39D47E79D422FD824';

  constructor() {
  }

  public base64url(source: any): string {
    let encodedSource = cryptoJs.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
  }

  public generateToken(username: string): string {

    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const date = new Date();
    const iat = Math.floor(date.getTime() / 1000);
    const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);

    const payload = {
      iat,
      sub: username,
      exp,
    };

    const stringHeader = cryptoJs.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = this.base64url(stringHeader);

    const stringPayload = cryptoJs.enc.Utf8.parse(JSON.stringify(payload));
    const encodedPayload = this.base64url(stringPayload);

    let signature: any = encodedHeader + '.' + encodedPayload;
    signature = cryptoJs.HmacSHA256(signature, this.secretKey);
    signature = this.base64url(signature);

    return encodedHeader + '.' + encodedPayload + '.' + signature;
  }

  public verifyToken(token: string): boolean {

    const parts = token.split('.');
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];

    const signatureCheck = this.base64url(cryptoJs.HmacSHA256(header + '.' + payload, this.secretKey));
    return (signature === signatureCheck);
  }

}

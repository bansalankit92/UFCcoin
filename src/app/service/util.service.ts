import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {


  static isValidAddress(etherAddress: string): boolean {
   return (etherAddress.length === 42 || etherAddress.length === 40);
  }

  static getActualTokenValue(value: number): number {
    return value / 1000000000000000000;
   }

  constructor() { }


}

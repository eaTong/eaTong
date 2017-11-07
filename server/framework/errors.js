/**
 * Created by eatong on 17-11-6.
 */
export class ArgMissError {
  constructor(arg) {
    this.name = 'ArgMissError';
    this.message = `argument:'${arg}' is required , but you didn't pass to the body!`;
    this.stack = new Error().stack;
  }
}

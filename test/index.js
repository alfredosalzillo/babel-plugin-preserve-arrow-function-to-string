import { transform } from '@babel/core';

const conf = {
  presets: [['@babel/preset-env']],
  plugins: ['./index.js'],
};
describe('babel-plugin-preserve-arrow-function-to-string', () => {
  it('should redeclare arrow toString', () => {
    const input = '() => console.log("test")';
    const { code } = transform(input, conf);
    expect(code).not.toEqual(input);
    expect(eval(code).toString()).toEqual(input);
  });
  it('should not redeclare function toString', () => {
    const input = 'function test() { console.log("test") }';
    const { code } = transform(input, conf);
    expect(eval(code).toString).toEqual(''.toString);
  });
});

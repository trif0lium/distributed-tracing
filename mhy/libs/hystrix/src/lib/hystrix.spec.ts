import { hystrix } from './hystrix';

describe('hystrix', () => {
  it('should work', () => {
    expect(hystrix()).toEqual('hystrix');
  });
});

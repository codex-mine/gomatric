import { HashUtil } from './hash.util';

describe('HashUtil', () => {
  it('should hash and verify passwords correctly', async () => {
    const raw = 'SuperSecretPass123!';
    const hashed = await HashUtil.hash(raw);

    expect(hashed).toBeDefined();
    expect(hashed).not.toEqual(raw);

    const isMatch = await HashUtil.verify(hashed, raw);
    expect(isMatch).toBe(true);

    const isInvalid = await HashUtil.verify(hashed, 'WrongPassword');
    expect(isInvalid).toBe(false);
  });
});

import { testServer } from '../src/server/testServer';

test('test server', async () => {
  await expect(testServer()).toBe('Server Running');
});

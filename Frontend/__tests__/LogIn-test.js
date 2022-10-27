import {logIn} from '../utils/api';

it('Login Api', async () => {
  const values = {username: 'Test', password: '1234'};
  let res = await logIn(values);
  expect(res.data.token).not.toBe(undefined);
});

it('Login Api False', async () => {
  const values = {username: 'Test', password: '12345'};
  return expect(logIn(values)).rejects.toThrow(
    'Request failed with status code 400',
  );
});

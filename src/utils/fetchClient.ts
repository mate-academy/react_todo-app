// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function wait(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export const client = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: async <T>(_url: string) => {
    await wait(100);
    throw new Error(
      'Network disabled: use localStorage implementation in api/todos.ts',
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  post: async <T>(_url: string, _data: unknown) => {
    await wait(100);
    throw new Error(
      'Network disabled: use localStorage implementation in api/todos.ts',
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  patch: async <T>(_url: string, _data: unknown) => {
    await wait(100);
    throw new Error(
      'Network disabled: use localStorage implementation in api/todos.ts',
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete: async (_url: string) => {
    await wait(100);
    throw new Error(
      'Network disabled: use localStorage implementation in api/todos.ts',
    );
  },
};

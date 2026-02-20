export const ERROR_MESSAGES = {
  LOAD_FAIL: 'Unable to load todos',
  EMPTY_TITLE: 'Title should not be empty',
  ADD_FAIL: 'Unable to add a todo',
  DELETE_FAIL: 'Unable to delete a todo',
  UPDATE_FAIL: 'Unable to update a todo',
} as const;

export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];

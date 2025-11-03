import { ErrorMessages } from '../types/Todo';

export const ERROR_MESSAGES: ErrorMessages = {
  LOAD_TODOS: 'Unable to load todos',
  ADD_TODO: 'Unable to add a todo',
  DELETE_TODO: 'Unable to delete a todo',
  UPDATE_TODO: 'Unable to update a todo',
  EMPTY_TITLE: 'Title should not be empty',
  NETWORK: 'Network error. Please try again later.',
  UNKNOWN: 'Something went wrong.',
  LOCAL_STORAGE: 'Something went wrong with local storage',
  CONTEXT_MISSING: 'useTodos must be used within a TodoProvider',
  TOGGLE_ALL_FAIL: 'Unable to toggle all todos status',
  CLEAR_COMPLETED_FAIL: 'Unable to clear completed todos',
};

export const getErrorMessage = (
  error: unknown,
  defaultKey?: keyof typeof ERROR_MESSAGES,
): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'error' in error) {
    const errObj = error as { error?: string };

    if (errObj.error) {
      return errObj.error;
    }
  }

  if (defaultKey) {
    return ERROR_MESSAGES[defaultKey] || ERROR_MESSAGES.UNKNOWN;
  }

  return ERROR_MESSAGES.UNKNOWN;
};

// export const ERROR_MESSAGES = {
//   LOAD_TODOS: 'Unable to load todos',
//   ADD_TODO: 'Unable to add a todo',
//   DELETE_TODO: 'Unable to delete a todo',
//   UPDATE_TODO: 'Unable to update a todo',
//   EMPTY_TITLE: 'Title should not be empty',
//   NETWORK: 'Network error. Please try again later.',
//   UNKNOWN: 'Something went wrong.',
//   LOCAL_STORAGE: 'Something went wrong with local storage',
// };
//
// export const getErrorMessage = (
//   error: unknown,
//   defaultKey?: keyof typeof ERROR_MESSAGES,
// ): string => {
//   if (error instanceof Error && error.message) {
//     return error.message;
//   }
//
//   if (typeof error === 'object' && error !== null && 'error' in error) {
//     const errObj = error as { error?: string };
//
//     if (errObj.error) {
//       return errObj.error;
//     }
//   }
//
//   return ERROR_MESSAGES[defaultKey] || ERROR_MESSAGES.UNKNOWN;
// };

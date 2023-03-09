import { Error } from '../enums/Error';

export const Errors = {
  [Error.RESET]: '',
  [Error.ADD]: 'Unable to add a todo',
  [Error.REMOVE]: 'Unable to delete a todo',
  [Error.UPDATE]: 'Unable to delete a todo',
  [Error.TITLE]: 'Title can\'t be empty',
  [Error.DATA]: 'Data error',
  [Error.USER]: 'Check your USER_ID',
  [Error.UPLOAD]: 'Unable to upload a todos',
  [Error.USERVALID]: 'Incorrect USER ID',
  [Error.RANDOMID]: 'There are no avalible IDs to use! Try: 22339988',
  [Error.NAME]: 'Name field can\'t be empty',
  [Error.EMAIL_EMPTY]: 'Email field can\'t be empty',
  [Error.EMAIL_WRONG]: 'This email is invalid',
  [Error.CHECKFIELDS]: 'Check fields',
};

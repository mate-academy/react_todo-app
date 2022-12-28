export enum ErrorType {
  Unexpected = 'Something went wrong',

  Add = 'Unable to add a todo',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',

  EmptyTitle = 'Title can\'t be empty',
  EmptyEmail = 'Email can\'t be empty',
  EmptyName = 'Name can\'t be empty',

  InvalidEmail = 'Invalid email',
  InvalidName = 'Name is too short',
}

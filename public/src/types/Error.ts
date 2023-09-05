export enum Error {
  NONE = '',
  DOWNLOADING = 'An error occurred while executing the request',
  NOT_VALIDE_TITLE = 'Title can\'t be empty',
  ADD = 'Unable to add a todo',
  DELETE = 'Unable to delete a todo',
  DELETE_ALL = 'Unable to delete completed todos',
  UPDATE = 'Unable to update a todo',
  TOGGLE = 'Unable to toggle all todos',
}

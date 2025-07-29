export enum ErrorType {
  NO_ERROR = '',
  FAIL_LOADING = 'Unable to load todos',
  EMPTY_TITLE = 'Title should not be empty',
  FAIL_CREATING = 'Unable to add a todo',
  FAIL_DELETING = 'Unable to delete a todo',
  FAIL_UPDATING = 'Unable to update a todo',
  UNKNOWN = 'An unexpected error occured',
}

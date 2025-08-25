export enum TodosStatus {
  ALL,
  ACTIVE,
  COMPLETED,
}

export enum ErrorMessages {
  LOAD_FAILED = 'Unable to load todos',
  ADD_FAILED = 'Unable to add a todo',
  UPDATE_FAILED = 'Unable to update a todo',
  DELETE_FAILED = 'Unable to delete a todo',
  EMPTY_TITLE = 'Title should not be empty',
  UNKNOWN_ERROR = 'An unknown error occurred',
}

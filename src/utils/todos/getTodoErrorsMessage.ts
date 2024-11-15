import { TodoErrors } from '../enums/TodoErrors';

export const getTodoErrorsMessage = (error: TodoErrors) => {
  switch (error) {
    case TodoErrors.load:
      return 'Unable to load todos';
    case TodoErrors.title:
      return 'Title should not be empty';
    case TodoErrors.add:
      return 'Unable to add a todo';
    case TodoErrors.delete:
      return 'Unable to delete a todo';
    case TodoErrors.update:
      return 'Unable to update a todo';
    default:
      return 'An unexpected error';
  }
};

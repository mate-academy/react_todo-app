import { useState } from 'react';
import { TodoErrors } from '../utils/enums/TodoErrors';

export const useTodoErrors = () => {
  const [error, setError] = useState<TodoErrors | null>(null);

  const showError = (err: TodoErrors) => {
    setError(err);
    setTimeout(() => setError(null), 3000);
  };

  return { error, showError };
};

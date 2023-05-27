import { useState } from 'react';
import { postTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

import { ErrorTypes } from '../../types/ErrorTypes';

export interface TodoFormProps {
  userId: number;
  onError: (errorMessage: string) => void;
  onSuccess: (todo: Todo) => void;
  onTempTodo: (todo: Todo) => void;
  handleSelectAll: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  userId,
  onError,
  onSuccess,
  onTempTodo,
}) => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      onError(ErrorTypes.TITLE);

      return;
    }

    setIsSubmitting(true);

    const newTodo: Todo = {
      id: 0,
      userId,
      title: todoTitle,
      completed: false,
    };

    onTempTodo(newTodo);

    try {
      const response = await postTodo(newTodo);

      onSuccess(response);
    } catch {
      onError(ErrorTypes.ADD);
    } finally {
      setIsSubmitting(false);
      setTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        disabled={isSubmitting}
      />
    </form>
  );
};

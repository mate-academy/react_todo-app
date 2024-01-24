import { useCallback, useContext } from 'react';

import { TodosContext } from './TodosContext';
import { Todo } from '../types/todo';

type Props = {};

export const TodoForm: React.FC<Props> = () => {
  const { title, setTitle, setTodoItems } = useContext(TodosContext);

  const addTodo = useCallback(({ id, ...data }: Todo) => {
    const newTodo = {
      id: +new Date(),
      ...data,
    };

    setTodoItems((currentTodos: Todo[]) => {
      if (!newTodo.title.trim()) {
        return [...currentTodos];
      }

      return [newTodo, ...currentTodos];
    });
  }, [setTodoItems]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      id: 0,
      title,
      completed: false,
    });
    setTitle('');
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};

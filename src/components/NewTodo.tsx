import { useCallback, useContext } from 'react';

import { TodosContext } from './TodosContext';
import { TodoType } from '../types/todo';

type Props = {};

export const NewTodo: React.FC<Props> = () => {
  const {
    title, setTitle, todos, setTodos,
  } = useContext(TodosContext);

  const addTodo = useCallback(({
    title: currentTitle, completed,
  }: TodoType) => {
    const newTodo = {
      id: +new Date(),
      title: currentTitle.trim(),
      completed,
    };

    if (!newTodo.title.trim()) {
      setTodos([...todos]);

      return;
    }

    setTodos([newTodo, ...todos]);
  }, [todos, setTodos]);

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
        style={{ outline: 'none' }}
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

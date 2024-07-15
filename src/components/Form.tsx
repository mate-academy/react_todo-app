import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';

type TodoFormProps = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoForm: React.FC<TodoFormProps> = ({ inputRef }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const { setTodos } = useContext(TodoContext);

  const handleTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleReset = () => {
    setTodoTitle('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = todoTitle.trim();

    if (trimmedTitle) {
      const newTodo: Todo = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);

      setTodoTitle('');
      // inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={handleTodoTitle}
        ref={inputRef}
      />
    </form>
  );
};

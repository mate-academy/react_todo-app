import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';

interface Props {}

export const AddTodoForm: React.FC<Props> = () => {
  const [inputQuery, setInputQuery] = useState('');
  const { handleAddTodo, todos } = useContext(TodoContext);
  const focusInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    focusInput.current?.focus();
  }, [todos]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputQuery.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: inputQuery.trim(),
      completed: false,
    };

    handleAddTodo(newTodo);
    setInputQuery('');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        value={inputQuery}
        onChange={event => setInputQuery(event.target.value)}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={focusInput}
      />
    </form>
  );
};

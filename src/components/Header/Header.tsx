import React, {
  FormEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/todo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoTitle.trim().length) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    const newTodos: Todo[] = [...todos, newTodo];

    setTodos(newTodos);
    setTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          ref={inputRef}
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};

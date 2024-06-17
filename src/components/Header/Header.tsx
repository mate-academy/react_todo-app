import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../Contexts/TodoContext';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState('');

  const addNewTodo = () => {
    if (todoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo();
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const toggleAllTodos = () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(newTodos);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={toggleAllTodos}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from '../Contexts/TodosContext';
import { Todo } from '../types/Todo';

export const Header: React.FC = ({}) => {
  const [query, setQuery] = useState('');
  const { todos, setTodos, inputFocus } = useContext(TodosContext);

  const areAllCompleted = todos.every(todo => todo.completed);

  const onUpdateAllTodosStatus = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: !areAllCompleted })),
    );
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: query.trim(),
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setQuery('');
    inputFocus.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => onUpdateAllTodosStatus()}
        />
      )}

      <form onSubmit={submitHandler}>
        <input
          ref={inputFocus}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
        />
      </form>
    </header>
  );
};

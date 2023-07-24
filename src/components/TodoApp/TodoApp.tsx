import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp: React.FC = () => {
  const {
    areTodos,
    areAllCompleted,
    toggleAllTodosStatus,
    addTodo,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    addTodo(newTodo);
    setTodoTitle('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {areTodos && (
        <>
          <section className="main">
            <input
              checked={areAllCompleted}
              onChange={() => toggleAllTodosStatus()}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <TodosFilter />
        </>
      )}
    </div>
  );
};

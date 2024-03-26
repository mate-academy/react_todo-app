import React, { useCallback, useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoContext } from '../context/TodosContext';
import { Filter } from './Filter';
// import { filterTodos } from './FilterTodos';
// import { Status } from '../types/Type';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [activeCheckbox, secActiveCheckbox] = useState(false);

  const { orderItems, setOrderItems } = useContext(TodoContext);

  // #region List
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query.trim().length <= 0) {
        return;
      }

      setOrderItems(prevItems => {
        const newItem = {
          id: +new Date(),
          title: query,
          completed: false,
          editing: false,
        };

        return [...prevItems, newItem];
      });

      setQuery('');
    },
    [query, setOrderItems, setQuery],
  );
  // #endregion

  const hanledActiveAllCheckbox = () => {
    secActiveCheckbox(!activeCheckbox);
    setOrderItems(prevOrderItems =>
      prevOrderItems.map(todo => ({
        ...todo,
        completed: !activeCheckbox,
      })),
    );
  };

  const hendlerDestroyAll = () => {
    const visibleTodos = orderItems;

    setOrderItems(visibleTodos.filter(todo => !todo.completed));
  };

  // const visibleItemsCount =
  //   status === Status.ALL
  //     ? visibleItems.filter(item => !item.completed).length
  //     : visibleItems.length;

  // const isSomeCompleted = visibleItems.some(item => item.completed);
  // console.log(
  //   orderItems.filter(item => !item.completed),
  //   orderItems.filter(item => !item.completed).length,
  // );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleQuerySubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleQueryChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={hanledActiveAllCheckbox}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {orderItems.length > 0 && <TodoList />}
      </section>

      {orderItems.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {orderItems.filter(item => !item.completed).length} items left
          </span>

          <Filter />

          {orderItems.filter(item => item.completed).length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={hendlerDestroyAll}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

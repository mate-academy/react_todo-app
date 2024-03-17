import React, { useContext, useMemo } from 'react';
import { TodoList } from '../TodoList';
import { DispatchContext, StateContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter';
import { filterTodos } from '../../services/filterTodos';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

const generateId = (elems: Todo[]) => {
  const values = elems.map(elem => elem.id);

  return (Math.max(...values) + 1 | 0);
};

export const TodoApp = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, title } = useContext(StateContext);

  const memorizedTodos = useMemo(() => {
    return filterTodos(todos, Status.all);
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    dispatch({
      type: 'setTodos',
      payload: [
        ...todos,
        {
          id: generateId(todos),
          title,
          completed: false,
        },
      ],
    });

    dispatch({ type: 'setTitle', payload: '' });
  };

  const handleToggleAll = () => {
    dispatch({ type: 'setIsSelectedAll' });

    const toggledTodos = todos.map(todo => {
      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    dispatch({ type: 'setTodos', payload: toggledTodos });
  };

  const handleDeleteCompleted = () => {
    const unCompleted = filterTodos(todos, Status.active);

    dispatch({ type: 'setTodos', payload: unCompleted });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={title}
            onChange={e =>
              dispatch({ type: 'setTitle', payload: e.target.value })
            }
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {memorizedTodos && (
        // {filterTodos(todos, Status.all).length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={
                filterTodos(todos, Status.completed).length === todos.length
              }
            />
            {/* eslint-disable-next-line */}
            <label htmlFor="toggle-all" onClick={handleToggleAll}>
              Mark all as complete
            </label>

            <TodoList />
          </section>
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${filterTodos(todos, Status.active).length} items left`}
            </span>

            <TodosFilter />

            {filterTodos(todos, Status.completed).length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleDeleteCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

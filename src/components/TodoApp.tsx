import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { Todo } from '../type/Todo';
import { Status } from '../enums/Status';

function filterTodos(todos: Todo[], filter: Status): Todo[] {
  switch (filter) {
    case Status.complete:
      return todos.filter(todo => todo.completed);

    case Status.active:
      return todos.filter(todo => !todo.completed);

    default:
      return todos;
  }
}

export const TodoApp: React.FC = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Status.all);

  const visibleTodos = filterTodos(todos, filter);
  const isToggleAll = todos.every(todo => todo.completed === true);
  const isCompletedInTodos = todos.some(todo => todo.completed === true);
  const totalIncomplete = todos.reduce(
    (acc, curr) => (curr.completed === false ? acc + 1 : acc),
    0,
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    dispatch({
      type: 'create',
      playload: {
        id: +new Date(),
        title,
        completed: false,
      },
    });

    setTitle('');
  };

  const handleToggleAll = () => {
    dispatch({
      type: 'updateAll',
      playload: {
        completed: !isToggleAll,
      },
    });
  };

  const handleDeleteCompleted = () => {
    dispatch({
      type: 'deleteCompleted',
    });
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
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isToggleAll}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={visibleTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${totalIncomplete} items left`}
            </span>

            <TodosFilter filter={filter} setFilter={setFilter} />

            {isCompletedInTodos && (
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

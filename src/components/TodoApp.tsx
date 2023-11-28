import { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodosFilter';
import { DispatchContext, StateContext } from './TodosContext';
import { filterItems } from '../helpers/filterItems';

export const TodoApp: React.FC = () => {
  const { todos, toggleAll, filteredBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [newTitle, setNewTitle] = useState('');

  const completedTodos = todos.filter(
    todo => todo.completed,
  ).length;
  const notCompleted = todos.length - completedTodos;
  const filtereTodos = filterItems(todos, filteredBy);

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: 'createTodo',
      payload: {
        id: +new Date(),
        title: newTitle,
        completed: false,
      },
    });

    setNewTitle('');
  };

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggleAll',
      payload: e.target.checked,
    });
  };

  const handleClear = () => {
    dispatch({
      type: 'clear',
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={createTodo}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
        </form>
      </header>

      { !!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAll}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={filtereTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${notCompleted} items left`}
            </span>

            <TodoFilter />

            {!!completedTodos && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClear}
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

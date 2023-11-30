import { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodosFilter';
import { DispatchContext, StateContext } from './TodosContext';
import { filterItems } from '../helpers/filterItems';

export const TodoApp: React.FC = () => {
  const { todos, filteredBy } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const completedTodos = todos.filter(
    todo => todo.completed,
  ).length;
  const notCompleted = todos.length - completedTodos;
  const filteredTodos = filterItems(todos, filteredBy);

  const [newTitle, setNewTitle] = useState('');
  const [timerId, setTimerId] = useState(0);
  const isToggleAll = completedTodos === todos.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerId);
    setNewTitle(e.target.value);
    setTimerId(0);
  };

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setNewTitle(
        'Todo can not be empty',
      );

      setTimerId(+setTimeout(() => setNewTitle(''), 3000));

      return;
    }

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
            onChange={handleOnChange}
            style={{
              color: timerId ? 'red' : '',
            }}
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
              checked={isToggleAll}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={filteredTodos} />
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

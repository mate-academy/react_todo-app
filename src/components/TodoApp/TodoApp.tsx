import { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { TodoContext, DispatchContext } from '../../context/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodoFilter/TodFilter';
import { Status } from '../../types/types';
export const TodoApp = () => {
  const todoItems = useContext(TodoContext);
  const dispatch = useContext(DispatchContext);

  const [itemValue, setItemValue] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const CompletedTodos = todoItems.filter(item => item.completed).length;
  const allCompleted =
    todoItems.length > 0 && todoItems.every(item => item.completed);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItemValue(event.target.value);
  };

  const handleFilterChange = (status: Status) => {
    setFilter(status);
  };

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = todoItems.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    const newId = maxId + 1;

    dispatch({
      type: 'ADD_TODO',
      payload: { id: newId, title: itemValue, completed: false },
    });
    setItemValue('');
  };

  const handleToggleAllChange = () => {
    const toggleTo = !allCompleted;

    dispatch({ type: 'TOGGLE_ALL', payload: toggleTo });
  };

  const handleDeleteComplete = () => {
    dispatch({ type: 'DELETE_COMPLETED' });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={itemValue}
            onChange={handleInputChange}
          />
        </form>
      </header>

      {todoItems.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allCompleted}
              onChange={handleToggleAllChange}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList filter={filter} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {todoItems.length - CompletedTodos} items left
            </span>

            <TodosFilter
              data-cy="todosFilter"
              filter={filter}
              onFilter={handleFilterChange}
            />
            {CompletedTodos > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleDeleteComplete}
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

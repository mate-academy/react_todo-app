/* eslint-disable jsx-a11y/control-has-associated-label */
import { FormEventHandler, useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { Status, Todo, TodosContext } from './TodosContext';

const filterTodos = (todos: Todo[], filter: Status) => {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    case Status.All:
    default:
      return todos;
  }
};

export const TodoApp = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const [filter, setFilter] = useState(Status.All);
  const [todoTitle, setTodoTitle] = useState<string>('');

  const visibleTodos = filterTodos(todos, filter);
  const isToggleAll = todos.every(todo => todo.completed === true);
  const isAnyCompletedTodo = todos.some(todo => todo.completed);
  const incompletedCounter = todos.reduce(
    (total, current) => (current.completed === false ? total + 1 : total),
    0,
  );

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    if (todoTitle.trim().length === 0) {
      return;
    }

    dispatch({
      type: 'addItem',
      payload: {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      },
    });

    setTodoTitle('');
  };

  const handleToggleAll = () => {
    dispatch({
      type: 'updateAll',
      payload: { completed: !isToggleAll },
    });
  };

  const handleClearCompleted = () => {
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
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
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
              {incompletedCounter} items left
            </span>

            <TodosFilter filter={filter} setFilter={setFilter} />

            {isAnyCompletedTodo && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
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

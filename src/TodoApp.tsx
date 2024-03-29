import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { ContextTodos } from './TodoContext';
import { Todo } from './types/Todo';
import { Status } from './enums/Status';
import { TodosFilter } from './TodosFilter';

const filterTodos = (todos: Todo[], filter: Status): Todo[] => {
  switch (filter) {
    case Status.active:
      return todos.filter(todo => !todo.completed);
    case Status.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const TodoApp: React.FC = () => {
  const { todos, dispatch } = useContext(ContextTodos);
  const incompleteTodosLength = todos.filter(
    todo => todo.completed === false,
  ).length;
  const isAllTodosCompleted = todos.every(todo => todo.completed === true);
  const isAnyTodoCompleted = todos.some(todo => todo.completed === true);
  const [filter, setFilter] = useState(Status.all);
  const [titleValue, setTitleValue] = useState('');
  const showTodos = filterTodos(todos, filter);

  const hanleClearCompletedTodo = () => {
    dispatch({
      type: 'deleteCompleted',
    });
  };

  const handleToggleAllCompleted = () => {
    dispatch({
      type: 'updateCompleteAll',
      playload: {
        completed: !isAllTodosCompleted,
      },
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (titleValue.trim() === '') {
      return;
    }

    dispatch({
      type: 'create',
      playload: {
        id: +new Date(),
        title: titleValue,
        completed: false,
      },
    });

    setTitleValue('');
  };

  const handleTitleCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={titleValue}
            onChange={handleTitleCreate}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
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
              checked={isAllTodosCompleted}
              onChange={handleToggleAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={showTodos} />
          </section>
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {incompleteTodosLength} items left
            </span>
            <TodosFilter filter={filter} setFilter={setFilter} />

            {isAnyTodoCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={hanleClearCompletedTodo}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </>
  );
};

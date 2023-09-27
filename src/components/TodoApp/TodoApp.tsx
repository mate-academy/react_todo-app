import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import classNames from 'classnames';

import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const isAllTodosCompleted = todos.every((todo) => todo.completed === true);

  const handleChangeStatusTodos = () => {
    setTodos(updatedTodos => updatedTodos.map((curTodo) => ({
      ...curTodo,
      completed: !isAllTodosCompleted,
    })));
  };

  const handleTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim().length) {
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
    };

    setTodos((updatedTodos) => [...updatedTodos, newTodo]);
    setTodoTitle('');
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const handleRemoveAllCompleted = useCallback(() => {
    setTodos(updatedTodos => (
      updatedTodos.filter(curTodo => !curTodo.completed)
    ));
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleTodoAdd}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={handleTodoTitleChange}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              checked={isAllTodosCompleted}
              data-cy="toggleAll"
              onChange={handleChangeStatusTodos}
              className={classNames('toggle-all', {
                active: !isAllTodosCompleted,
              })}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {
                `${uncompletedTodos.length} items left`
              }
            </span>

            <TodosFilter />
            {todos.length - uncompletedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleRemoveAllCompleted}
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

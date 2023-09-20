import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';

import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const isAllCompleted = todos.every(todo => todo.completed === true);

  const handleChangeStatusTodos = () => {
    setTodos(curentTodos => curentTodos.map(curTodo => ({
      ...curTodo,
      completed: !isAllCompleted,
    })));
  };

  const handleTodoAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTodoTitle('');
  };

  const handleRemoveAllCompleted = () => {
    setTodos(curruntTodos => (
      curruntTodos.filter(curTodo => !curTodo.completed)
    ));
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
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
              checked={isAllCompleted}
              className={classNames('toggle-all', {
                active: !isAllCompleted,
              })}
              data-cy="toggleAll"
              onChange={handleChangeStatusTodos}
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

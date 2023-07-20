import React, { useState, useContext } from 'react';
import { TodosContext, SetTodosContext } from '../contexts/TodosContext';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { FilterStatus } from '../types/FilterStatus';

export const TodoApp = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [
    filterStatus, setFilterStatus,
  ] = useState<FilterStatus>(FilterStatus.All);

  const todosPrep = useContext(TodosContext);
  const setTodos = useContext(SetTodosContext);

  const todos = todosPrep.filter((todo) => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const leftTodos = todos.filter((todo) => !todo.completed);
  const compleatedTodos = todos.filter((todo) => todo.completed);
  const leftTodosText = leftTodos.length === 1 ? 'item' : 'items';

  const [allCompleted, setAllCompleted] = useState<boolean>(
    leftTodos.length === 0,
  );

  React.useEffect(() => {
    setAllCompleted(leftTodos.length === 0);
  }, [leftTodos.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodoTitle('');

    setTodos([newTodo, ...todos]);
  };

  const handleCompleteAll = () => {
    const newTodos = [...todos];

    newTodos.forEach((todo) => {
      // eslint-disable-next-line no-param-reassign
      todo.completed = !allCompleted;
    });

    setTodos(newTodos);
    setAllCompleted(!allCompleted);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      {todosPrep.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleCompleteAll}
              checked={allCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </section>

          <TodoList todos={todos} />

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${leftTodos.length} ${leftTodosText} left`}
            </span>

            <TodosFilter
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            {compleatedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodos(leftTodos)}
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

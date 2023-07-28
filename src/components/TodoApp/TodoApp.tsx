import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../context/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { Status } from '../../types/Status';
import { TodoFilter } from '../TodoFilter/TodoFilter';

export const TodoApp: React.FC = () => {
  const [todoContent, setTodoContent] = useState('');
  const { todos, setTodos } = React.useContext(TodosContext);
  const [sortField, setSortField] = useState(Status.all);
  const [toggleTodosIsActive, setToggleTodosIsActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent(e.target.value);
  };

  const addTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoContent.trim() === '') {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoContent,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoContent('');
  };

  const notCompletedTodos = todos.filter(
    todo => !todo.completed,
  );

  const completedTodos = todos.filter(todo => todo.completed);

  const clearAllTodoCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(
      todo => !todo.completed,
    ));
  };

  const toggleAllTodos = () => {
    setToggleTodosIsActive(!toggleTodosIsActive);

    setTodos(currentTodos => currentTodos.map(
      todo => ({ ...todo, completed: !toggleTodosIsActive }),
    ));
  };

  const preparedTodos = (allTodos: Todo[], sortBy: Status) => {
    const filteredTodos = [...allTodos];

    switch (sortBy) {
      case Status.active:
        return filteredTodos.filter(todo => !todo.completed);

      case Status.completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  const visibleTodos = preparedTodos(todos, sortField);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoContent}
            onInput={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        {visibleTodos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              // checked={todos.every(todo => todo.completed)}
              onClick={toggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
        <TodoList visibleTodos={visibleTodos} />
      </section>

      {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${notCompletedTodos.length} items left`}
            </span>

            <TodoFilter
              sortField={sortField}
              setSortField={setSortField}
            />

            {completedTodos.length > 0
            && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllTodoCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
    </div>
  );
};

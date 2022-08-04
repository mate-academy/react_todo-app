/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/newTodo';
import { Todo } from './types/Todo';

// enum Status {
//   All = 'All',
//   Active = 'Active',
//   Completed = 'Completed',
// }

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [notCompletedTodos, setCompletedNumber] = useState(0);
  // const [showTodos, setShowTodos] = useState(Status.All);

  useEffect(() => {
    const completed = todos.filter(todo => todo.completed === false);

    setVisibleTodos([...todos]);
    setCompletedNumber(completed.length);
  }, [todos]);

  const onAddTodo = (newTitle: string) => {
    const newTodo: Todo = {
      id: (+new Date()),
      title: newTitle,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const handleCompleteItem = (id: number) => {
    const update = todos.map(t => {
      if (t.id === id) {
        return {
          ...t,
          completed: !t.completed,
        };
      }

      return t;
    });

    setTodos(update);
  };

  const toggleAll = () => {
    const update = todos.map(t => {
      if (todos.some(to => to.completed === false)) {
        return {
          ...t,
          completed: true,
        };
      }

      return {
        ...t,
        completed: false,
      };
    });

    setTodos(update);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>

        <NewTodo onAdd={onAddTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => toggleAll()}
        />
        <label
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>

        {todos.length > 0 && (
          <TodoList
            todos={visibleTodos}
            handleChange={handleCompleteItem}
          />
        )}
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {notCompletedTodos !== 1
            ? `${notCompletedTodos} items left`
            : `${notCompletedTodos} item left`}
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import { NavBar } from './components/NavBar';
import { TodoItem } from './components/TodoItem';

export type Todos = {
  id: number;
  title: string;
  completed: boolean;
};

export const App: React.FC = () => {
  const initialTodos: Todos[] = [
    { id: 1, title: 'first todo', completed: false },
    { id: 2, title: 'second todo', completed: false },
    { id: 3, title: 'third todo', completed: false },
    { id: 4, title: 'something else', completed: false },
    { id: 5, title: 'one more thing', completed: false },
  ];

  const [todos, setTodos] = useState(initialTodos);

  // const [sortTodos, setSortTodos] = useState(todos);

  const [todoTitle, setTodoTitle] = useState('');

  const biggestId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const justId = todos.map(todo => todo.id);

    return Math.max(...justId) + 1;
  };

  const [incompleteCount, setIncompleteCount] = useState(
    todos.filter(todo => !todo.completed).length,
  );

  useEffect(() => {
    const newIncompleteCount = todos.filter(todo => !todo.completed).length;

    setIncompleteCount(newIncompleteCount);
  }, [todos]);

  const AddNewTodo = () => {
    if (!todoTitle.trim()) {
      return;
    }

    return setTodos([
      {
        id: biggestId(),
        title: todoTitle,
        completed: false,
      },
      ...todos,
    ]);
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    AddNewTodo();

    setTodoTitle('');
  };

  return (
    <nav className="panel is-primary">
      <p className="panel-heading">todos list</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <form onSubmit={handleSubmit}>
            <input
              value={todoTitle}
              className="input is-primary"
              type="text"
              placeholder="What needs to be done?"
              onChange={event => setTodoTitle(event.target.value)}
            />
          </form>
          <a className="icon is-left">
            <i className="fas fa-pen-clip"></i>
          </a>
        </p>
      </div>

      <NavBar
        todos={todos}
        setTodos={setTodos}
        // sortTodos={sortTodos}
        // setSortTodos={setSortTodos}
        incompleteCount={incompleteCount}
      />

      <TodoItem
        todos={todos}
        setTodos={setTodos}
        // sortTodos={sortTodos}
        // setSortTodos={setSortTodos}
        incompleteCount={incompleteCount}
      />
    </nav>
  );
};

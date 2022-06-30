import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  getUser,
  addTodoToServer,
  removeTodoToServer,
  getTodosUser,
  editTodo,
} from './api/api';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

import { StateContext, DispatchContext } from './StateContext';

const App:React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, user } = useContext(StateContext);

  const [countCompetedTodos, setCountCompetedTodos] = useState(0);
  const [countActiveTodos, setСountActiveTodos] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [sortBy, setSortBy] = useState('all');

  const handleCountTodo = () => {
    const completedTodo = todos.filter(todo => todo.completed === true).length;
    const activeTodo = todos.filter(todo => todo.completed === false).length;

    setCountCompetedTodos(completedTodo);
    setСountActiveTodos(activeTodo);
  };

  const handleSortBy = (type: string) => {
    setSortBy(type);
  };

  const handleTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const setUser = async() => {
    try {
      const response = await getUser();

      if (response.status === 200) {
        dispatch({ type: 'getUser', user: response.data });
      }
    } catch {
      throw new Error('error');
    }
  };

  const handleTodos = async() => {
    try {
      const response = await getTodosUser();

      if (response.status === 200) {
        dispatch({ type: 'getUserTodos', todos: response.data });
      }
    } catch {
      throw new Error('error');
    }
  };

  const handleAddTodo = async() => {
    try {
      const response = await addTodoToServer(textInput);

      if (response.status === 201) {
        dispatch({ type: 'addTodo', todo: response.data });
      }
    } catch {
      throw new Error('error');
    }
  };

  const handleRemoveTodo = async(id: number) => {
    try {
      const response = await removeTodoToServer(id);

      if (response.status === 200) {
        dispatch({ type: 'deleteTodo', id });
      }
    } catch {
      throw new Error('error');
    }
  };

  const updateTodo = async(id: number, payload: any) => {
    try {
      const response = await editTodo(id, payload);

      if (response.status === 200) {
        dispatch({ type: 'updateTodo', id, todo: response.data });
      }
    } catch {
      throw new Error('error');
    }
  };

  const handleToggleAll = () => {
    const allTodosCompleted = todos.filter(
      todo => !todo.completed,
    ).length === 0;

    if (allTodosCompleted) {
      todos.forEach((todo) => {
        editTodo(todo.id, { completed: false });
      });
    } else {
      todos.forEach((todo) => {
        if (todo.completed === false) {
          editTodo(todo.id, { completed: true });
        }
      });
    }

    dispatch({ type: 'toggleAll', allTodosCompleted });
  };

  const handleClearCompleted = () => {
    todos.forEach(async(todo) => {
      try {
        if (todo.completed === true) {
          const response = await removeTodoToServer(todo.id);

          if (response.status === 200) {
            dispatch({ type: 'clearCompletedTodos' });
          }
        }
      } catch {
        throw new Error('error');
      }
    });
  };

  useEffect(() => {
    setUser();
    handleTodos();
  }, []);

  useEffect(() => {
    handleCountTodo();
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <CSSTransition
          in={!!user}
          timeout={1000}
          classNames="header-title"
        >
          <h1>todos</h1>
        </CSSTransition>
        <form onSubmit={(event) => {
          event.preventDefault();
          if (!textInput.trim()) {
            return;
          }

          handleAddTodo();
          setTextInput('');
        }}
        >
          <input
            value={textInput}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => {
              handleTextInput(event);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.filter(todo => !todo.completed).length === 0}
          onChange={() => {
            handleToggleAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          handleRemoveTodo={handleRemoveTodo}
          updateTodo={updateTodo}
          sortBy={sortBy}
        />
      </section>

      {!!todos.length && (
        <footer className="footer">
          {!!countActiveTodos && (
            <span className="todo-count">
              {todos.length === 1
                ? '1 item left'
                : `${countActiveTodos} items left`}
            </span>
          )}

          <TodoFilter handleSortBy={handleSortBy} sortBy={sortBy} />

          {!!countCompetedTodos && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => {
              handleClearCompleted();
            }}
          >
            Clear completed
          </button>
          )}
        </footer>
      )}
    </section>
  );
};

export default App;

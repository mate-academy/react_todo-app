import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../Todo';
import { TodoListFooter } from '../TodoListFooter';
import {
  getUserInfo,
  getTodos,
  addTodoToServer,
  removeTodoFromServer,
  updateTodoOnServer,
} from '../../api';
import {
  calculateIncompleteTodos,
  getVisibleTodos,
  convertFilterToEnum,
  getIncompleteTodoIds,
} from './utils';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [userName, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const appliedFilter = convertFilterToEnum(searchParams.get('filter'));

  const loadUser = async () => {
    const userFromServer = await getUserInfo();

    if (!userFromServer.error) {
      setUser(userFromServer.name);
      setLoadingUser(false);
    } else {
      setErrorMessage('Failed to fecth User Info');
    }
  };

  const loadTodos = async () => {
    const dataFromServer = await getTodos();

    if (!dataFromServer.error) {
      setTodos(dataFromServer);
    } else {
      setErrorMessage('Failed to fetch todos');
    }
  };

  useEffect(() => {
    loadUser();
    loadTodos();
  }, []);

  const toggleTodo = async (todoId: number, onlyOnServer = false) => {
    const currentCompletedValue = todos.find(todo => todo.id === todoId)?.completed;

    if (!onlyOnServer) {
      const result = todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      setTodos(result);
    }

    if (currentCompletedValue !== undefined) {
      const responseOnUpdateTodoOnServer = await updateTodoOnServer(todoId, {
        completed: !currentCompletedValue,
      });

      if (responseOnUpdateTodoOnServer.error) {
        setErrorMessage('Failed to update todo on server');
      }
    }
  };

  const toggleAll = () => {
    const allComplete = calculateIncompleteTodos(todos) === 0;
    const listOfTodosToToggle = todos.filter(todo => (
      allComplete || todo.completed === false
    )).map(todo => todo.id);

    const result = todos.map(todo => ({
      ...todo,
      completed: !allComplete,
    }));

    setTodos(result);

    listOfTodosToToggle.forEach(todoId => {
      toggleTodo(todoId, true);
    });
  };

  const removeTodo = async (todoId: number) => {
    const result = todos.filter(todo => todo.id !== todoId);

    setTodos(result);

    const responseOnRemoveTodo = await removeTodoFromServer(todoId);

    if (responseOnRemoveTodo.error) {
      setErrorMessage('Failed to remove todo from server');
    }
  };

  const addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedTitle = todoTitle.replaceAll(' ', '');

    if (formattedTitle === '') {
      return;
    }

    const reponseOnAddTodoToServer = await addTodoToServer(todoTitle);

    if (reponseOnAddTodoToServer.error) {
      setErrorMessage('Failed to add todo to server');

      return;
    }

    setTodos([
      ...todos,
      {
        title: todoTitle.trim(),
        completed: false,
        id: reponseOnAddTodoToServer.id,
      },
    ]);
    setTodoTitle('');
  };

  const clearCompletedTodos = () => {
    const result = todos.filter(todo => !todo.completed);
    const todosToRemoveFromServer = getIncompleteTodoIds(todos);

    setTodos(result);

    todosToRemoveFromServer.forEach(async (id) => {
      const responseOnRemoveTodo = await removeTodoFromServer(id);

      if (responseOnRemoveTodo.error) {
        setErrorMessage('Failed to remove todo from server');
      }
    });
  };

  const changeTodoTitle = async (newTitle: string, todoId: number) => {
    const result = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle.trim(),
        };
      }

      return {
        ...todo,
      };
    });

    setTodos(result);

    const responseOnUpdateTodoOnServer = await updateTodoOnServer(todoId, {
      title: newTitle,
    });

    if (responseOnUpdateTodoOnServer.error) {
      setErrorMessage('Failed to update todo on server');
    }
  };

  const visibleTodos = getVisibleTodos(todos, appliedFilter);

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>{loadingUser ? 'Loading...' : userName}</h1>

          <form onSubmit={addTodo}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={() => {
              toggleAll();
            }}
            checked={calculateIncompleteTodos(todos) === 0}
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <Todo
                key={todo.id}
                {...todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
                changeTodoTitle={changeTodoTitle}
              />
            ))}
          </ul>
        </section>

        <TodoListFooter
          todos={todos}
          clearCompletedTodos={clearCompletedTodos}
        />
      </section>
      <div className="error-message">
        {errorMessage}
      </div>
    </div>
  );
};

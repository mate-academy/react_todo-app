import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getVisibleTodos } from './helpers/getVisibleTodos';
import {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { USER_ID, getUser } from './api/user';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [filterBy, setFilterBy] = useState<Status>(Status.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const deleteError = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    const loadedTodos = localStorage.getItem('todos');

    if (loadedTodos) {
      setTodos(JSON.parse(loadedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getUserName = async () => {
    const loadedUser = await getUser(USER_ID);

    setUser(loadedUser);
  };

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    } catch (error) {
      setErrorMessage((error as Error).message);

      clearError();
    }
  };

  useEffect(() => {
    getUserName();
    loadTodos();
  }, []);

  const visibleTodos = getVisibleTodos(todos, filterBy);

  const handleAddNewTodo = async () => {
    try {
      if (title.trim()) {
        const newTodo = {
          id: 0,
          completed: false,
          userId: USER_ID,
          title: title.trim(),
        };
        const addedTodo = await addTodo(newTodo);

        setTodos((prevTodos: Todo[]) => [...prevTodos, addedTodo]);
      }
    } catch {
      setErrorMessage('Unable to add a todo');

      clearError();
    } finally {
      setTitle('');
    }
  };

  const handleUpdateTodo = async (
    todoId: number,
    parameterToUpdate: Partial<Todo>,
  ) => {
    try {
      await updateTodo(todoId, parameterToUpdate);

      setTodos((prevTodos: Todo[]) => prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, ...parameterToUpdate };
        }

        return todo;
      }));
    } catch {
      setErrorMessage('Unable to update a todo');

      clearError();
    }
  };

  const isAllCompleted = todos.every((todo: Todo) => todo.completed);

  const handleToggleAll = async () => {
    try {
      if (isAllCompleted) {
        todos.forEach(todo => (
          handleUpdateTodo(todo.id, { completed: false })
        ));
      } else {
        const activeTodos = todos.filter(todo => !todo.completed);

        activeTodos.forEach(todo => (
          handleUpdateTodo(todo.id, { completed: true })
        ));
      }
    } catch {
      setErrorMessage('Unable to update a todo');

      clearError();
    }
  };

  const handleRemoveTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos: Todo[]) => prevTodos
        .filter(todo => todo.id !== todoId));
    } catch {
      setErrorMessage('Unable to delete a todo');

      clearError();
    }
  };

  const deleteCompletedTodos = () => {
    const completedTodoIds = todos
      .filter((todo: Todo) => todo.completed)
      .map((todo: Todo) => todo.id);

    completedTodoIds.map((id: number) => deleteTodo(id));
    setTodos((prevTodos: Todo[]) => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      {user ? (
        <h2 className="todoapp__userTitle">
          {`Hello, ${user.name}`}
        </h2>
      ) : (
        <h2 className="todoapp__userTitle"> </h2>
      )}
      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          onSaveNewTodo={handleAddNewTodo}
        />

        <section className="todoapp__main">
          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                name="toggleAll"
                id="todoapp__toggle-all"
                className="todoapp__toggle-all"
                data-cy="toggleAll"
                onClick={handleToggleAll}
              />
              <label
                className="todoapp__toggle-all-label"
                htmlFor="todoapp__toggle-all"
              >
                Mark all as complete
              </label>

              <TodoList
                todos={visibleTodos}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleRemoveTodo}
              />
            </>
          )}
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterBy={filterBy}
            onChangeFilter={setFilterBy}
            onDeleteCompletedTodos={deleteCompletedTodos}
          />
        )}
      </div>
      <div
        className="error"
        hidden={!errorMessage}
      >
        <button
          type="button"
          className="error__delete"
          aria-label="Delete error-button"
          onClick={deleteError}
        />
        {errorMessage}
      </div>
    </div>
  );
};

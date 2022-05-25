/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import NewTodoForm from './components/NewTodoForm/NewTodoForm';
import TodoList from './components/TodoList/TodoList';
import TodosCounter from './components/TodosCounter/TodosCounter';
import TodosFilter from './components/TodosFilter/TodosFilter';
import ClearCompletedButton
  from './components/ClearCompletedButton/ClearCompletedButton';
import ToggleAll from './components/ToggleAll/Toggle';
import {
  addNewTodo, changeTodo, deleteTodo, getUser, getUserTodos,
} from './api';

const TodoApp: React.FC = () => {
  const [userId] = useState(3542);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleAllStatus, setToggleAllStatus] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [user, setUser] = useState('');
  const [isErrorOccured, setIsErrorOccured] = useState(false);

  const mainClasses = classNames({
    main: true,
    hidden: todos.length === 0,
  });

  const footerClasses = classNames({
    footer: true,
    hidden: todos.length === 0,
  });

  const errorClasses = classNames({
    error: true,
    hidden: !isErrorOccured,
  });

  const getUserName = async () => {
    try {
      const userFS = await getUser(userId);

      setUser(userFS.name);
    } catch {
      setUser('User loading failed');
    }
  };

  const getTodosFromServer = async () => {
    const todosFS: Todo[] = await getUserTodos(userId);

    setTodos([...todosFS]);

    if (todosFS.length > 0) {
      const numberOfActiveTodos = todosFS
        .filter(todo => !todo.completed).length;

      if (numberOfActiveTodos === 0) {
        setToggleAllStatus(true);
      }
    } else {
      setToggleAllStatus(false);
    }
  };

  const handleChangeRequest = async (
    todoId: number, changingField: string, newValue: string,
  ) => {
    const result = await changeTodo(todoId, changingField, newValue);

    if (!result) {
      setIsErrorOccured(true);

      setTimeout(() => setIsErrorOccured(false), 3000);
    }

    return result;
  };

  const handleDeleteRequest = async (todoId: number) => {
    const result = await deleteTodo(todoId);

    if (!result) {
      setIsErrorOccured(true);

      setTimeout(() => setIsErrorOccured(false), 3000);
    }

    return result;
  };

  const editCompletedStatus = async (newStatus: boolean, todoId: number) => {
    await handleChangeRequest(todoId, 'completed', newStatus.toString());

    await getTodosFromServer();

    const isAnyTodoActive = todos.find(todo => todo.completed === false);

    if (!isAnyTodoActive) {
      setToggleAllStatus(true);
    }

    if (toggleAllStatus) {
      setToggleAllStatus(false);
    }
  };

  const handleToggleAllClick = async () => {
    switch (toggleAllStatus) {
      case false:
        const activePromises = todos.map(todo => {
          if (!todo.completed) {
            return handleChangeRequest(todo.id, 'completed', 'true');
          }

          return '';
        });

        await Promise.all(activePromises.filter(promise => promise !== ''));
        break;

      default:
        const completedPromises = todos.map(todo => handleChangeRequest(
          todo.id, 'completed', 'false',
        ));

        await Promise.all(completedPromises);
        break;
    }

    setToggleAllStatus(prev => !prev);

    getTodosFromServer();
  };

  const handleFormSubmit
    = async (event: React.FormEvent<HTMLFormElement>, newTodoTitle: string) => {
      event.preventDefault();
      if (!newTodoTitle) {
        return;
      }

      await addNewTodo(newTodoTitle, userId, false);

      getTodosFromServer();
    };

  const applyFilter = (chosenFilter: string) => {
    switch (chosenFilter) {
      case 'active':
        setCurrentFilter('active');
        break;
      case 'completed':
        setCurrentFilter('completed');
        break;
      default:
        setCurrentFilter('all');
    }
  };

  const getVisibleTodos = () => {
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => todo.completed === false);
      case 'completed':
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const getActiveNumber = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    return activeTodos.length;
  };

  const deleteCompletedTodos = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    const completedTodosPromises = completedTodos
      .map(todo => handleDeleteRequest(todo.id));

    await Promise.all(completedTodosPromises);

    getTodosFromServer();
  };

  const handleClearCompletedClick = () => {
    deleteCompletedTodos();

    const numberOfActiveTodos = getActiveNumber();

    if (numberOfActiveTodos === 0) {
      setToggleAllStatus(prev => !prev);
    }
  };

  const getCompletedTodosLength = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const editTodoTitle = async (newTitle: string, todoId: number) => {
    if (!newTitle) {
      await handleDeleteRequest(todoId);
    } else {
      await handleChangeRequest(todoId, 'title', newTitle);
    }

    getTodosFromServer();
  };

  useEffect(() => {
    getUserName();
    getTodosFromServer();
  }, []);

  return (
    <section className="todoapp">
      <div
        className={errorClasses}
      >
        Something went wrong with server connection
      </div>
      <header className="header">
        <h1>
          {`${user} todos`}
        </h1>

        <NewTodoForm
          data-cy="createTodo"
          handleSubmit={handleFormSubmit}
        />
      </header>

      <section className={mainClasses}>
        <ToggleAll
          toggleAllStatus={toggleAllStatus}
          handleToggleAllClick={handleToggleAllClick}
        />

        <TodoList
          data-cy="todoList"
          items={getVisibleTodos()}
          editTodoTitle={editTodoTitle}
          editCompletedStatus={editCompletedStatus}
        />
      </section>

      <footer className={footerClasses}>
        <TodosCounter
          data-cy="todosCounter"
          todos={todos}
        />

        <TodosFilter
          applyFilter={applyFilter}
        />

        <ClearCompletedButton
          completedTodosLength={getCompletedTodosLength()}
          handleClearCompletedClick={handleClearCompletedClick}
        />
      </footer>
    </section>
  );
};

export default TodoApp;

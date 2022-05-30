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
import Filters from './enums/enums';

let todoForSavingInLS: Todo[] = [];

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleAllStatus, setToggleAllStatus] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(Filters.All);

  todoForSavingInLS = [...todos];

  const mainClasses = classNames({
    main: true,
    hidden: todos.length === 0,
  });

  const footerClasses = classNames({
    footer: true,
    hidden: todos.length === 0,
  });

  const editTodoTitle = (newTitle: string, todoId: number) => {
    const changedArray = todos
      .map(todo => {
        if (todo.id === todoId) {
          return {
            id: todo.id,
            title: newTitle,
            completed: todo.completed,
          };
        }

        return todo;
      });

    setTodos(changedArray.filter(todo => todo.title !== ''));
  };

  const editCompletedStatus = (newStatus: boolean, todoId: number) => {
    const changedArray = todos
      .map(todo => {
        if (todo.id === todoId) {
          return {
            id: todo.id,
            title: todo.title,
            completed: newStatus,
          };
        }

        return todo;
      });

    const isAnyTodoActive = changedArray.find(todo => todo.completed === false);

    if (!isAnyTodoActive) {
      setToggleAllStatus(true);
    }

    if (toggleAllStatus) {
      setToggleAllStatus(false);
    }

    setTodos(changedArray);
  };

  const handleToggleAllClick = () => {
    setTodos(prevTodos => prevTodos.map(todo => {
      return {
        id: todo.id,
        title: todo.title,
        completed: !toggleAllStatus,
      };
    }));

    setToggleAllStatus(prev => !prev);
  };

  const handleFormSubmit
    = (event: React.FormEvent<HTMLFormElement>, newTodoTitle: string) => {
      event.preventDefault();
      if (!newTodoTitle) {
        return;
      }

      setTodos(prevTodos => [...prevTodos,
        {
          id: +new Date(),
          title: newTodoTitle,
          completed: false,
        }]);
    };

  const applyFilter = (chosenFilter: string) => {
    switch (chosenFilter) {
      case Filters.Active:
        setCurrentFilter(Filters.Active);
        break;
      case Filters.Completed:
        setCurrentFilter(Filters.Completed);
        break;
      default:
        setCurrentFilter(Filters.All);
    }
  };

  const getVisibleTodos = () => {
    switch (currentFilter) {
      case Filters.Active:
        return todos.filter(todo => todo.completed === false);
      case Filters.Completed:
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const getActive = () => {
    const changedArray = todos.filter(todo => !todo.completed);

    setTodos(changedArray);

    return changedArray.length;
  };

  const handleClearCompletedClick = () => {
    const numberOfActiveTodos = getActive();

    if (numberOfActiveTodos === 0) {
      setToggleAllStatus(prev => !prev);
    }
  };

  const getCompletedTodosLength = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const handleWindowClose = () => {
    const todosStringForLS = JSON.stringify(todoForSavingInLS);

    localStorage.setItem('todos', todosStringForLS);
  };

  useEffect(() => {
    const todosStringFromLS = localStorage.getItem('todos') || '';
    let todosFromLS: Todo[] = [];

    if (todosStringFromLS) {
      todosFromLS = JSON.parse(todosStringFromLS);
    }

    if (todosFromLS.length > 0) {
      setTodos([...todosFromLS]);

      const numberOfActiveTodos = todosFromLS
        .filter(todo => !todo.completed).length;

      if (numberOfActiveTodos === 0) {
        setToggleAllStatus(true);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload',
      handleWindowClose);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload',
        handleWindowClose);
    };
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

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

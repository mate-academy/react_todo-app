import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import {
  getMyTodos, postNewTodo, removeTodo, editTodo,
} from '../api/todos';
import { Todo } from '../types/Todo';
import './TodoApp.scss';

export const TodoApp: React.FC = () => {
  // #region loadTodos
  const [myTodos, setMyTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    getMyTodos().then(setMyTodos);
  };
  // #endregion

  // #region addNewTodo, deleteTodo
  const [title, setTitle] = useState('');

  const addNewTodo = () => {
    postNewTodo(title).then(loadTodos);
    setTitle('');
  };

  const deleteTodo = (todoId: number) => {
    removeTodo(todoId);
    setMyTodos(myTodos.filter(
      (todo: Todo) => todo.id !== todoId,
    ));
  };
  // #endregion

  const todosLeft = useMemo(() => {
    return (
      myTodos.reduce((acc, todo) => (!todo.completed ? acc + 1 : acc), 0)
    );
  }, [myTodos]);

  const todosCompleted = useMemo(() => {
    return (
      myTodos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0)
    );
  }, [myTodos]);

  // #region changeTodo
  const changeStatus = (todoId: number) => {
    myTodos.forEach((todo: Todo) => {
      if (todo.id === todoId) {
        const data = { completed: !todo.completed };

        editTodo(`/todos/${todoId}`, data).then(loadTodos);
      }
    });
  };

  const changeTitle = (todoId: number, newTitle: string) => {
    const data = { title: newTitle };

    if (!newTitle) {
      removeTodo(todoId);
    }

    editTodo(`/todos/${todoId}`, data).then(loadTodos);
  };
  // #endregion

  const [toggleAllActive, setToggleAllActive] = useState(false);

  const changeStatusAll = () => {
    const result = myTodos.map((todo: Todo) => {
      if (!toggleAllActive) {
        editTodo(`/todos/${todo.id}`, { completed: true });

        return {
          ...todo,
          completed: true,
        };
      }

      editTodo(`/todos/${todo.id}`, { completed: false });

      return {
        ...todo,
        completed: false,
      };
    });

    setMyTodos(result);
    setToggleAllActive(!toggleAllActive);
  };

  // #region visiableTodos
  const [visiableTodos, setVisiableTodos] = useState(myTodos);

  const showTodos = (param: string) => {
    switch (param) {
      case 'all':
        setVisiableTodos(myTodos);
        break;
      case 'active':
        setVisiableTodos(myTodos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setVisiableTodos(myTodos.filter(todo => todo.completed));
        break;
      default:
        break;
    }
  };
  // #endregion

  const clearCompleted = () => {
    myTodos.forEach((todo: Todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });

    setMyTodos(myTodos.filter((todo: Todo) => !todo.completed));

    setToggleAllActive(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    setVisiableTodos(myTodos);
  }, [myTodos]);

  return (
    <section className="TodoApp">
      <header className="TodoApp__header">
        <h1 className="TodoApp__title">
          todos
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNewTodo();
          }}
        >
          <input
            type="text"
            className="TodoApp__new-todo input"
            placeholder="What needs to be done?"
            data-cy="createTodo"
            value={title}
            onChange={
              (event) => setTitle(event.target.value)
            }
          />
        </form>
      </header>

      <section className="TodoApp__main">
        <input
          type="checkbox"
          id="toggle-all"
          className="TodoApp__toggle-all"
          data-cy="toggleAll"
          onChange={() => {
            changeStatusAll();
          }}
        />
        <label
          htmlFor="toggle-all"
          className={
            classNames(
              'TodoApp__toggleAll-label',
              { 'TodoApp__toggleAll-label--completed': toggleAllActive },
            )
          }
        >
          Mark all as complete
        </label>

        <TodoList
          items={visiableTodos}
          deleteTodo={deleteTodo}
          changeStatus={changeStatus}
          changeTitle={changeTitle}
        />
      </section>

      {myTodos.length > 0 && (
        <footer className="TodoApp__footer">
          <span className="TodoApp__todo-count" data-cy="todosCounter">
            {todosLeft === 1
              ? '1 item left'
              : `${todosLeft} items left`}
          </span>

          <TodosFilter
            showTodos={showTodos}
          />

          {todosCompleted > 0 && (
            <button
              type="button"
              className="TodoApp__clear-completed"
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};

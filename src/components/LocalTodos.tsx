/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const LocalTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoInput, setNewTodoInput] = useState('');
  const [editableId, setEditableId] = useState('');
  const [editableTitle, setEditableTitle] = useState('');
  const location = useLocation();
  const localTodos = JSON.parse(localStorage.getItem('todos') || '{}');

  useEffect(() => {
    if (localTodos.length > 0) {
      setTodos(JSON.parse(localStorage.getItem('todos') || '{}'));
    }

    if (editableId.length === 0) {
      const mainInput = document.querySelector('.new-todo') as HTMLElement;

      if (mainInput) {
        mainInput.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (editableId.length) {
      const editInput = document.querySelector('#editableTodo') as HTMLElement;

      if (editInput) {
        editInput.focus();
      }
    }
  }, [editableId]);

  const removeHandler = (todoId:string) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const makeThisEditable = (todoId:string, todoTitle:string) => {
    setEditableId(todoId);
    setEditableTitle(todoTitle);
  };

  const editableTodoHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  const handleBlur = () => {
    const editableTodo = todos.find(todo => todo.id === editableId);

    if (editableTodo) {
      if (editableTitle.length === 0) {
        removeHandler(editableId);
      } else {
        editableTodo.title = editableTitle;
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    }

    setEditableTitle('');
    setEditableId('');

    const editInput = document.querySelector('#editableTodo') as HTMLElement;

    if (editInput) {
      editInput.blur();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditableTitle('');
        setEditableId('');
      }

      if (event.key === 'Enter') {
        handleBlur();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleCompleted = (todoId:string) => {
    const selectedTodoIndex = todos.findIndex(todo => todo.id === todoId);

    const updatedTodo = todos[selectedTodoIndex];

    updatedTodo.completed = !updatedTodo.completed;

    const newTodos = [...todos];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const todoMarkup = (todo:Todo) => {
    return todo.id === editableId
      ? (
        <li
          className="editing"
          key={todo.id}
          onBlur={handleBlur}
        >
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label>{editableTitle}</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input
            type="text"
            className="edit"
            id="editableTodo"
            value={editableTitle}
            onChange={editableTodoHandle}
          />
        </li>
      )
      : (
        <li
          key={todo.id}
          className={classNames({ completed: todo.completed })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
            />
            <label onDoubleClick={() => makeThisEditable(todo.id, todo.title)}>
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => removeHandler(todo.id)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      );
  };

  const newTodoInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(event.target.value);
  };

  const handleNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoInput.length > 0) {
      const NewTodo = {
        id: `${Math.floor(Math.random() * 10000)}`,
        title: newTodoInput,
        completed: false,
      };
      const NewTodos = [NewTodo, ...todos];

      setTodos(NewTodos);
      localStorage.setItem('todos', JSON.stringify(NewTodos));
      setNewTodoInput('');
    }
  };

  const clearCompleted = () => {
    const newTodos = localTodos
      .filter((todo:Todo) => todo.completed === false);

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  let visualTodos = localTodos;

  if (location.pathname === '/local/active') {
    visualTodos = localTodos.filter((todo:Todo) => todo.completed === false);
  }

  if (location.pathname === '/local/completed') {
    visualTodos = localTodos
      .filter((todo:Todo) => todo.completed === true);
  }

  const ToggleAll = () => {
    if (!todos.find(todo => !todo.completed)) {
      const updatedTodos = todos
        .map((todo:Todo) => ({ ...todo, completed: false }));

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    } else {
      const updatedTodos = todos
        .map((todo:Todo) => ({ ...todo, completed: true }));

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  return (
    <>
      <h1 className="title">These are your</h1>
      <div className="todoapp">
        <header className="header">
          <h1>Local Todos</h1>

          <form
            onSubmit={handleNewTodo}
          >
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodoInput}
              onChange={newTodoInputHandle}
            />
          </form>
        </header>

        {todos.length !== 0 && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                checked={!todos
                  .find(todo => !todo.completed)}
                onChange={ToggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <ul className="todo-list" data-cy="todoList">
                {visualTodos.map((todo:Todo) => todoMarkup(todo))}
              </ul>
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${localTodos.filter((todo:Todo) => !todo.completed).length} items left`}
              </span>

              <ul className="filters">
                <li>
                  <Link
                    to="/local"
                    className={classNames({
                      selected: location.pathname === '/local',
                    })}
                  >
                    All
                  </Link>
                </li>

                <li>
                  <Link
                    to="/local/active"
                    className={classNames({
                      selected: location.pathname === '/local/active',
                    })}
                  >
                    Active
                  </Link>
                </li>

                <li>
                  <Link
                    to="/local/completed"
                    className={classNames({
                      selected: location.pathname === '/local/completed',
                    })}
                  >
                    Completed
                  </Link>
                </li>
              </ul>

              {todos.find(todo => todo.completed) && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </>
  );
};

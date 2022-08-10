/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from './TodoList';
import { Todo, TodoActionType } from '../types/Todo';
import { TodoFilter } from './TodoFilter';

const todosFromServer = [
  { id: 1, title: 'a', completed: false },
  { id: 2, title: 'b', completed: true },
  { id: 3, title: 'c', completed: false },
];

export const TodoApp: React.FC = () => {
  const location = useLocation().pathname.split('/')[1];
  let localTodosJSON = '';

  if (localStorage.getItem('todos')) {
    localTodosJSON = localStorage.getItem('todos') || '';
  }

  const localTodos = JSON.parse(localTodosJSON);

  const [todos, setTodos] = useState(localTodos);
  const [shownTodos, setShownTodos] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    let filteredTodos;

    switch (location) {
      case ('active'):
        filteredTodos = todos.filter((todo: Todo) => !todo.completed);
        break;
      case ('completed'):
        filteredTodos = todos.filter((todo: Todo) => todo.completed);
        break;
      default:
        filteredTodos = todos;
        break;
    }

    setShownTodos(filteredTodos);
  }, [location, todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const changeTodo = (
    id: number, action: TodoActionType, newTitle?: string,
  ) => {
    let newTodos = todos;

    switch (action) {
      case (TodoActionType.changeStatus):
        newTodos = todos.map((todo: Todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        });
        break;

      case (TodoActionType.delete):
        newTodos = todos.filter((todo: Todo) => todo.id !== id);
        break;

      case (TodoActionType.edit):
        if (newTitle) {
          newTodos = todos.map((todo: Todo) => {
            if (todo.id === id) {
              return { ...todo, title: newTitle };
            }

            return todo;
          });
        }

        break;

      default:
        break;
    }

    setTodos(newTodos);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: +new Date(), title: newTodo, completed: false },
      ]);

      setNewTodo('');
    }
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={() => addTodo()}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every((todo: Todo) => todo.completed)}
          onChange={(event) => {
            let newTodos;

            if (event.target.checked) {
              newTodos = todos.map(
                (todo: Todo) => ({ ...todo, completed: true }),
              );
            } else {
              newTodos = todos.map(
                (todo: Todo) => ({ ...todo, completed: false }),
              );
            }

            setTodos(newTodos);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList todos={shownTodos} changeTodo={changeTodo} />
      </section>

      {todos.length === 0 || (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter((todo: Todo) => !todo.completed).length} items left`}
          </span>

          <TodoFilter />

          <button
            type="button"
            className="clear-completed"
            onClick={() => clearCompleted()}
          >
            Clear completed
          </button>
        </footer>
      )}

    </div>
  );
};

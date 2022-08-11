import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [title, setTitle] = useState('');
  const [checked, setChecked] = useState(true);
  const location = useLocation();
  const params = location.pathname;

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos:Todo[]) => {
      return [...prevTodos, todo];
    });
  };

  const newTodo: Todo = {
    title,
    id: +new Date(),
    completed: false,
  };

  const visibleTodos = todos.filter((todo: Todo) => {
    switch (params) {
      case '/active': {
        return !todo.completed;
      }

      case '/': {
        return true;
      }

      case '/completed': {
        return todo.completed;
      }

      default:
        return true;
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(newTodo);
    setTitle('');
  };

  const handleChangeCheckbox = () => {
    setChecked((prevState) => {
      return !prevState;
    });
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (checked !== todo.completed) {
          return { ...todo, completed: checked };
        }

        return todo;
      });
    });
  };

  const handleChangeClearComplButton = () => {
    setTodos((prevTodo: Todo[]) => {
      return prevTodo.filter(todo => todo.completed !== true);
    });
  };

  const changeTodoStatus = (completed: boolean, todoId: number) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (todoId === todo.id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const editTitle = (todoTitle: string, todoId: number) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (todoId === todo.id) {
          return { ...todo, title: todoTitle };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (todoId: number) => {
    const filteredTodos = todos.filter((todo: Todo) => todo.id !== todoId);

    setTodos(filteredTodos);
  };

  const findCompleted = todos.find((todo: Todo) => (
    todo.completed === true
  ));

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={checked}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={visibleTodos}
              changeTodoStatus={changeTodoStatus}
              deleteTodo={deleteTodo}
              editTitle={editTitle}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {todos.filter((todo: Todo) => !todo.completed).length}
              {' '}
              items left
            </span>

            <TodosFilter />

            {findCompleted !== undefined && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleChangeClearComplButton}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};

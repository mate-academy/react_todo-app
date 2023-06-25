/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from './UseLocalStorage';
import { StorageKey } from './types/storagekey';
import { FilterTypes } from './types/filtertypes';
import { Todolist } from './Todolist';
import { Todo } from './types/todo';
import { TodoFilter } from './TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(StorageKey.todos, []);
  const [newTodo, setNewTodo] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [newTodos, setNewTodos] = useState<Todo[]>([]);

  const activeTodo = todos.every(todo => todo.completed) && todos.length > 0;
  const isCompleted = todos.some(todo => todo.completed);

  const addNewTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTodos(
        [...todos, {
          id: +new Date(),
          completed: false,
          title: newTodo,
        }],
      );

      setNewTodo('');
    }
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todoId !== todo.id));
  };

  useEffect(() => {
    setNewTodos(todos.filter(todo => {
      switch (filterOption) {
        case FilterTypes.Completed:
          return todo.completed === true;
        case FilterTypes.Active:
          return todo.completed === false;
        default:
          return todo;
      }
    }));
  }, [filterOption, todos]);

  const onCheckCompleted = (todoId: number) => {
    setTodos(
      todos.map((todo: Todo) => {
        if (todoId === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  };

  const activeTodosCount = () => {
    return newTodos.filter(todo => !todo.completed).length;
  };

  const todoNumber = activeTodosCount();

  const toggleAll = () => {
    const isActiveTodo = todos.some((todo) => !todo.completed);

    if (isActiveTodo) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      }));
    }

    if (!isActiveTodo) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      }));
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setNewTodos(todos);
  };

  const onEditTodo = (newTitle: string, todoId: number) => {
    setTodos(
      todos.map((todo: Todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }),
    );
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            value={newTodo}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
            onKeyDown={addNewTodo}

          />
        </form>
      </header>

      <section className="main">
        {todos.length ? (
          <>
            <input
              type="checkbox"
              checked={activeTodo}
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        ) : (
          null
        )}

        <Todolist
          items={newTodos}
          onCheck={onCheckCompleted}
          onDelete={deleteTodo}
          onEdit={onEditTodo}
        />

      </section>

      {todos.length ? (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeTodosCount() !== 1 ? (
              `${todoNumber} items left`
            ) : (
              `${todoNumber} item left`
            )}
          </span>

          <TodoFilter
            setFilterOption={setFilterOption}
          />
          {isCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      ) : (
        null
      )}
    </div>
  );
};

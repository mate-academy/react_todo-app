import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  addTodoToServer,
  deleteTodoFromServer,
  editTodoStatus,
  editTodoTitle,
  getTodos,
} from './api/api';
import { Todo } from './types/Todo';
import { TodoList } from './Components/TodoList/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodo, setVisibleTodo] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('all');

  const fetchTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setVisibleTodo(todosFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    switch (filterValue) {
      case 'active':
        setVisibleTodo(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setVisibleTodo(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodo(todos);
        break;
    }
  }, [filterValue, todos]);

  const addTodo = async (title: Todo['title']) => {
    await addTodoToServer(title);

    fetchTodos();
  };

  const deleteTodo = async (todoId: Todo['id']) => {
    await deleteTodoFromServer(todoId);

    fetchTodos();
  };

  const updateTodoStatus = async (todoId: Todo['id'], completed: Todo['completed']) => {
    await editTodoStatus(todoId, completed);

    fetchTodos();
  };

  const updateTodoTitle = async (todoId: Todo['id'], title: Todo['title']) => {
    await editTodoTitle(todoId, title);

    fetchTodos();
  };

  const deleteAllCompleted = () => {
    todos.filter(todo => todo.completed).map(todo => deleteTodo(todo.id));
  };

  const chekAllTodos = () => {
    if (todos.filter(todo => !todo.completed).length === 0) {
      todos.map(todo => updateTodoStatus(todo.id, false));
    } else {
      todos.map(todo => updateTodoStatus(todo.id, true));
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (newTodo.trim()) {
              addTodo(newTodo);
            }

            setNewTodo('');
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        {!!todos.length && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.filter(todo => !todo.completed).length === 0}
              onChange={() => chekAllTodos()}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
              <input hidden />
            </label>
            <TodoList
              visibleTodo={visibleTodo}
              updateTodoStatus={updateTodoStatus}
              deleteTodo={deleteTodo}
              updateTodoTitle={updateTodoTitle}
            />
          </>
        )}
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({ selected: filterValue === 'all' })}
                onClick={() => {
                  setFilterValue('all');
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({ selected: filterValue === 'active' })}
                onClick={() => {
                  setFilterValue('active');
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({ selected: filterValue === 'completed' })}
                onClick={() => {
                  setFilterValue('completed');
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          {todos.filter(todo => todo.completed).length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                deleteAllCompleted();
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

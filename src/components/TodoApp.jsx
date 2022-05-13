import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoList } from './TodoList';
import { getTodos, createTodo, changeTodo, deleteTodo } from '../api/api';
import { TodosFilter } from './TodosFilter';

export const TodoContent = React.createContext([]);

export const TodoApp = React.memo(
  ({ id }) => {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [toggleAll, setToggleAll] = useState(false);
    const [isPressSubmit, setIsPressSubmit] = useState(false);
    const [filterParam, setFilterParam] = useState('all');

    useEffect(() => {
      if (id) {
        getTodos(id)
          .then(setTodos);
      }
    }, [id, isPressSubmit]);

    const setToggleAllTodos = (count) => {
      if (count === todos.length && todos.length > 0) {
        setToggleAll(true);
      }

      if (count === 0) {
        setToggleAll(false);
      }
    };

    const todosLeft = useMemo(() => {
      const count = (
        todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0)
      );

      setToggleAllTodos(count);

      return count;
    }, [todos]);

    const toggleAllTodos = () => {
      if (toggleAll) {
        setTodos(curr => curr.map((todo) => {
          if (todo.completed) {
            changeTodo(todo.id, { completed: false });

            return { ...todo, completed: false };
          }

          setToggleAll(false);

          return todo;
        }));
      } else {
        setTodos(curr => curr.map((todo) => {
          if (!todo.completed) {
            changeTodo(todo.id, { completed: true });

            return { ...todo, completed: true };
          }

          setToggleAll(true);

          return todo;
        }));
      }
    };

    const deleteCompleted = () => {
      setTodos(curr => curr.filter((todo) => {
        if (todo.completed) {
          deleteTodo(todo.id);
        }

        return !todo.completed;
      }));
    };

    const contextValue = { todos, setTodos, setToggleAll };

    const changeIsPressSubmit = () => {
      setIsPressSubmit(curr => !curr);
    };

    const filteredTodos = useMemo(() => {
      switch (filterParam) {
        case 'active':
          return todos.filter(todo => !todo.completed);
        case 'completed':
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    }, [filterParam, todos]);

    return (
      <>
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={(event) => {
            event.preventDefault();

            if (todoTitle) {
              setTodoTitle('');
              createTodo(todoTitle, id)
                .then(changeIsPressSubmit);
            }
          }}
          >
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={({ target }) => {
                setTodoTitle(target.value);
              }}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            disabled={todos.length === 0}
            checked={toggleAll}
            onChange={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoContent.Provider value={contextValue}>
            <TodoList items={filteredTodos} />
          </TodoContent.Provider>

        </section>

        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {todosLeft > 0 && `${todosLeft} ${todosLeft > 1 ? 'items' : 'item'} left`}
            </span>

            <TodosFilter
              sortParam={filterParam}
              setSortParam={setFilterParam}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompleted}
            >
              {todosLeft > 0 && 'Clear completed'}
            </button>
          </footer>
        )}

      </>
    );
  },
);

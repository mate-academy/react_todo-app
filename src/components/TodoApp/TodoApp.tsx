import React, { useEffect, useMemo, useState } from 'react';
import {
  changeTodo, createTodo, deleteTodo, getTodos,
} from '../../api/api';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

type Props = {
  userId: number,
};

export const TodoApp: React.FC<Props> = React.memo(
  ({ userId }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [isPressSubmit, setIsPressSubmit] = useState(false);
    const [toggleAll, setToggleAll] = useState(false);
    const [filterParam, setFilterParam] = useState('all');

    useEffect(() => {
      if (userId) {
        getTodos(userId)
          .then(setTodos);
      }
    }, [userId, isPressSubmit]);

    const changeIsPressSubmit = () => {
      setIsPressSubmit(curr => !curr);
    };

    const setToggleAllTodos = (count: number) => {
      if (count === todos.length && todos.length > 0) {
        setToggleAll(true);
      }

      if (count === 0) {
        setToggleAll(false);
      }
    };

    const todosLeft = useMemo(() => {
      return (
        todos.reduce((acc, todo) => (!todo.completed ? acc + 1 : acc), 0)
      );
    }, [todos]);

    const createTodos = useMemo(() => {
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

    const removeTodo = (id: number) => {
      setTodos(curr => curr.filter((todo) => {
        if (todo.id === id) {
          deleteTodo(id);
        }

        return todo.id !== id;
      }));
    };

    const setTodoStatus = (id: number) => {
      setTodos(curr => curr.map(todo => {
        if (todo.id === id) {
          if (todo.completed) {
            setToggleAll(false);
          }

          changeTodo(id, { completed: !todo.completed });

          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }));
    };

    const changeTodoTitle = (id: number, newTitle: string) => {
      setTodos(curr => curr.map((todo) => {
        if (todo.id === id) {
          changeTodo(id, { title: newTitle });

          return { ...todo, title: newTitle };
        }

        return todo;
      }));
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

    const deleteCompleted = () => {
      setTodos(curr => curr.filter((todo) => {
        if (todo.completed) {
          deleteTodo(todo.id);
        }

        return !todo.completed;
      }));
    };

    return (
      <>
        <header className="header">
          <h1>todos</h1>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (todoTitle) {
                setTodoTitle('');
                createTodo(todoTitle, userId)
                  .then(changeIsPressSubmit);
              }
            }}
          >
            <input
              type="text"
              data-cy="createTodo"
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
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <TodoList
            todos={filteredTodos}
            setTodoStatus={setTodoStatus}
            removeTodo={removeTodo}
            changeTodoTitle={changeTodoTitle}
          />
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
              {createTodos !== 0 && 'Clear completed'}
            </button>
          </footer>
        )}
      </>
    );
  },
);

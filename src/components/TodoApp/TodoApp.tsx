import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  postTodo,
  deleteTodo,
  getTodo,
  patchTodos,
} from '../../api/todos/todosAPI';

import { TodoList } from '../TodoList';
import './TodoApp.scss';

type Props = {
  todos: Todo[],
  user: User | undefined,
  removeUser: () => void,
  handlerSingOut: () => void,
};

export const TodoApp: React.FC<Props> = ({
  todos,
  user,
  removeUser,
  handlerSingOut,
}) => {
  const [visibleTodo, setTodo] = useState<Todo[]>(todos);
  const [newTitle, setNewTitle] = useState('');
  const [updateTodos, setUpdateTodos] = useState(true);

  const handleSubmit = () => {
    if (newTitle && user) {
      (async () => {
        await postTodo(newTitle, user.id, false);
        setNewTitle('');
        setUpdateTodos(!updateTodos);
      })();
    }
  };

  useMemo(() => {
    (async () => {
      if (user) {
        const todo = await getTodo(user.id);

        setTodo(todo);
      }
    })();
  }, [updateTodos]);

  useEffect(() => {
    setTodo(todos);
  }, [todos]);

  const handlerChecked = (todoId: number) => {
    const findTodo = visibleTodo.find(todo => todo.id === todoId);

    if (findTodo) {
      patchTodos(todoId, !findTodo.completed, findTodo.title);
      findTodo.completed = !findTodo.completed;
    }

    setTodo(pre => [...pre]);
  };

  const handlerDeleteTodo = (todoId: number) => {
    const findTodo = visibleTodo.findIndex(todo => todo.id === todoId);

    if (findTodo >= 0) {
      deleteTodo(todoId);
      visibleTodo.splice(findTodo, 1);
      setTodo(pre => [...pre]);
    }
  };

  const handlerAllChecked = () => {
    const areCompleted = visibleTodo.every(todo => todo.completed);
    const findTodo = visibleTodo.map(todo => ({
      ...todo,
      completed: areCompleted ? !todo.completed : true,
    }));

    visibleTodo
      .forEach(todo => patchTodos(todo.id, (areCompleted ? !todo.completed : true), todo.title));

    setTodo(findTodo);
  };

  const location = useLocation();

  const parthName = location.pathname;

  let filterTodos = visibleTodo;

  useMemo(() => {
    filterTodos = parthName !== '/'
      ? visibleTodo.filter(todo => (
        parthName === '/completed'
          ? todo.completed
          : !todo.completed
      ))
      : visibleTodo;
  }, [parthName, newTitle, visibleTodo]);

  const setActive = ({ isActive }: { isActive:boolean }) => (isActive ? 'selected' : '');

  const deleteAllTodos = () => {
    const onlyActive = visibleTodo.filter(todo => todo.completed === false);

    visibleTodo
      .forEach(todo => {
        if (todo.completed) {
          deleteTodo(todo.id);
        }
      });

    setTodo(onlyActive);
  };

  const handlerEditTodo = (title: string, todoId: number) => {
    const editTodo = visibleTodo.map(todo => {
      if (todo.id === todoId) {
        return {
          title,
          userId: todo.userId,
          completed: todo.completed,
          id: todo.id,
        };
      }

      return todo;
    });

    visibleTodo.forEach(todo => {
      if (todo.id === todoId) {
        patchTodos(todoId, todo.completed, title);
      }
    });

    setTodo(editTodo);
  };

  return (
    <div className="TodoApp">
      <div className="TodoApp__header-btns">
        <button
          type="button"
          onClick={() => removeUser()}
          className="TodoApp__bnt TodoApp__bnt--delete-user"
        >
          Delete Account
        </button>
        <button
          type="button"
          onClick={() => handlerSingOut()}
          className="TodoApp__bnt TodoApp__bnt--delete-user"
        >
          Sign out
        </button>
      </div>
      <section className="todoapp">
        <header className="header">
          <h1>
            todos -
            {' '}
            {user
              ? user.name
              : <img className="TodoApp__loader-spiner" src="../../icons/loader.svg" alt="" />}
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          </form>
        </header>
        <TodoList
          visibleTodos={filterTodos}
          handlerChecked={handlerChecked}
          handlerDeleteTodo={handlerDeleteTodo}
          handlerAllChecked={handlerAllChecked}
          handlerEditTodo={handlerEditTodo}
        />
        {visibleTodo.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {visibleTodo.filter(todo => todo.completed === false).length}
              {' '}
              items left
            </span>

            <ul className="filters">
              <li>
                <NavLink
                  to="/"
                  className={setActive}
                  end
                >
                  All
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="active"
                  className={setActive}
                  end
                >
                  Active
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="completed"
                  className={setActive}
                  end
                >
                  Completed
                </NavLink>
              </li>
            </ul>

            <button
              type="button"
              className="clear-completed"
              onClick={deleteAllTodos}
            >
              Clear completed
            </button>
          </footer>
        ) }
      </section>
    </div>
  );
};

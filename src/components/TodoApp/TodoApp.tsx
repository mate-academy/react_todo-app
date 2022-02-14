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
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
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

        setVisibleTodos(todo);
      }
    })();
  }, [updateTodos]);

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  const handlerChecked = (todoId: number) => {
    const findTodo = visibleTodos.find(todo => todo.id === todoId);

    if (findTodo) {
      patchTodos(todoId, !findTodo.completed, findTodo.title);
      findTodo.completed = !findTodo.completed;
    }

    setVisibleTodos(pre => [...pre]);
  };

  const handlerDeleteTodo = (todoId: number) => {
    const findTodo = visibleTodos.findIndex(todo => todo.id === todoId);

    if (findTodo >= 0) {
      deleteTodo(todoId);
      visibleTodos.splice(findTodo, 1);
      setVisibleTodos(pre => [...pre]);
    }
  };

  const handlerAllChecked = () => {
    const areCompleted = visibleTodos.every(todo => todo.completed);
    const findTodo = visibleTodos.map(todo => ({
      ...todo,
      completed: areCompleted ? !todo.completed : true,
    }));

    visibleTodos
      .forEach(todo => patchTodos(todo.id, (areCompleted ? !todo.completed : true), todo.title));

    setVisibleTodos(findTodo);
  };

  const location = useLocation();

  const parthName = location.pathname;

  let filterTodos = visibleTodos;

  useMemo(() => {
    filterTodos = parthName !== '/'
      ? visibleTodos.filter(todo => (
        parthName === '/completed'
          ? todo.completed
          : !todo.completed
      ))
      : visibleTodos;
  }, [parthName, newTitle, visibleTodos]);

  const setActive = ({ isActive }: { isActive:boolean }) => (isActive ? 'selected' : '');

  const deleteAllTodos = () => {
    const onlyActive = visibleTodos.filter(todo => todo.completed === false);

    visibleTodos
      .forEach(todo => {
        if (todo.completed) {
          deleteTodo(todo.id);
        }
      });

    setVisibleTodos(onlyActive);
  };

  const handlerEditTodo = (title: string, todoId: number) => {
    const editTodo = visibleTodos.map(todo => {
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

    visibleTodos.forEach(todo => {
      if (todo.id === todoId) {
        patchTodos(todoId, todo.completed, title);
      }
    });

    setVisibleTodos(editTodo);
  };

  return (
    <div className="TodoApp">
      <div className="TodoApp__header-btns">
        <button
          type="button"
          onClick={removeUser}
          className="TodoApp__bnt TodoApp__bnt--delete-user"
        >
          Delete Account
        </button>
        <button
          type="button"
          onClick={handlerSingOut}
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
        {visibleTodos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {visibleTodos.filter(todo => todo.completed === false).length}
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

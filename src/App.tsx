import React, { useEffect, useState, useMemo } from 'react';
import { Auth } from './components/Auth';
import { TodoApp } from './components/TodoApp';
import { getTodos } from './api/todos/todosAPI';
import { getUsers, deleteUser } from './api/users/usersAPI';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [foundUser, setfoundUser] = useState<User | undefined>();
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [checkNewUser, setCheckNewUser] = useState(false);

  const checkUser = localStorage.getItem('userId');

  const dateFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodo(todosFromServer);
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      throw new Error('todos');
    }
  };

  const filterEmailUsers = users.map(user => user.email);

  useEffect(() => {
    dateFromServer();
  }, []);

  const waitingNewUser = () => {
    setCheckNewUser(!checkNewUser);
  };

  const handlerLogin = (email: string, password: string) => {
    (async () => {
      await dateFromServer();

      const findUser = users.find(user => user.email === email && user.username === password);

      if (findUser) {
        setfoundUser(findUser);
      }
    })();
  };

  useMemo(() => {
    if (foundUser) {
      localStorage.setItem('userId', foundUser ? foundUser.username : '');
    }

    const foundTodos = todos.filter(todo => todo.userId === foundUser?.id);

    setVisibleTodos(foundTodos);
  }, [foundUser]);

  useEffect(() => {
    if (checkUser) {
      const findUser = users.find(user => user.username === checkUser);

      setfoundUser(findUser);

      if (findUser) {
        const firstFilter = todos
          .filter(todo => todo.userId === findUser?.id);

        setVisibleTodos(firstFilter);
      }
    }
  }, [users]);

  const removeUser = () => {
    if (foundUser) {
      deleteUser(foundUser.id);

      localStorage.removeItem('userId');

      const updateUsers = users.filter(user => user.id !== foundUser.id);

      setUsers(updateUsers);
      setfoundUser(undefined);
    }
  };

  const handlerSingOut = () => {
    localStorage.removeItem('userId');
    setfoundUser(undefined);
  };

  return (
    <>
      {checkUser && (
        <TodoApp
          todos={visibleTodos}
          user={foundUser}
          removeUser={removeUser}
          handlerSingOut={handlerSingOut}
        />
      )}
      {!checkUser && (
        <Auth
          foundUser={foundUser}
          handlerLogin={handlerLogin}
          waitingNewUser={waitingNewUser}
          filterEmailUsers={filterEmailUsers}
        />
      )}
    </>
  );
};

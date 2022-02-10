import React, { useEffect, useState, useMemo } from 'react';
import { Auth } from './components/Auth';
import { TodoApp } from './components/TodoApp';
import { getTodos } from './api/todos/todosAPI';
import { getUsers, deleteUser } from './api/users/usersAPI';

export const App: React.FC = () => {
  const [todoasd, setTodo] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [foundUser, setfoundUser] = useState<User>();
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [checkNewUser, setCheckNewUser] = useState(false);

  const checkUser = localStorage.getItem('test');

  const waitingNewUser = () => {
    setCheckNewUser(!checkNewUser);
  };

  const handlerLogin = (email: string, password: string) => {
    const findUser = users.find(user => user.email === email && user.username === password);

    if (findUser) {
      setfoundUser(findUser);
    }
  };

  useMemo(() => {
    if (foundUser) {
      localStorage.setItem('test', foundUser ? foundUser.username : '');
    }

    const foundTodos = todoasd.filter(todo => todo.userId === foundUser?.id);

    setVisibleTodos(foundTodos);
  }, [foundUser]);

  useEffect(() => {
    if (checkUser) {
      const findUser = users.find(user => user.username === checkUser);

      setfoundUser(findUser);

      if (findUser) {
        const firstFilter = todoasd
          .filter(todo => todo.userId === findUser?.id);

        setVisibleTodos(firstFilter);
      }
    }
  }, [users]);

  useEffect(() => {
    (async () => {
      try {
        const todosFromServer = await getTodos();

        setTodo(todosFromServer);
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
      } catch {
        throw new Error('todos');
      }
    })();
  }, []);

  const removeUser = () => {
    if (foundUser) {
      deleteUser(foundUser.id);
      setCheckNewUser(!checkNewUser);
      localStorage.clear();
    }
  };

  return (
    <>
      {checkUser && (
        <TodoApp
          todos={visibleTodos}
          user={foundUser}
          removeUser={removeUser}
        />
      )}
      {!checkUser && <Auth handlerLogin={handlerLogin} waitingNewUser={waitingNewUser} />}
    </>
  );
};

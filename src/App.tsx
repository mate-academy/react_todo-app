/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
// import React, {
//   useContext, useEffect, useRef, useState,
// } from 'react';
// import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { Todo } from './types/Todo';
// import { getTodos } from './api/todos';
// import { User } from './types/User';
import { Login } from './components/login';
// import { Register } from './components/register';

// import { useLocalStorage } from './components/localstorage';

export const App: React.FC = () => {
  // const user: User | null = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [data, setData] = useState<Todo[]>([]);
  // const [data, setData] = useLocalStorage('data', []);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(data);
  // const [chousenButton, setChousenButton] = useState('All');

  // const todoFilter = (status:any) => {
  //   if (status === 'All') {
  //     setChousenButton(data);
  //   }

  //   if (status === 'Active') {
  //     setChousenButton(data.filter(todo => !todo.completed));
  //   }

  //   if (status === 'Completed') {
  //     setChousenButton(data.filter(todo => todo.completed));
  //   }
  // };

  // const newTodoField = useRef<HTMLInputElement>(null);
  // const [currentForm, setCurrentForm] = useState('login');

  // const fetchTodos = async () => {
  //   if (user) {
  //     const todos: any = await getTodos(user.id);

  //     setData(todos);
  //   }
  // };

  // useEffect(() => {
  //   // focus the element with `ref={newTodoField}`
  //   if (newTodoField.current) {
  //     newTodoField.current.focus();
  //   }

  //   fetchTodos();
  // }, []);

  useEffect(() => {
    setFilteredTodos(data);
  }, [data]);

  return (
    <div className="todoapp">
      <Login />

      <Header
        input={input}
        setInput={setInput}
        data={data}
        setData={setData}
      />

      {filteredTodos && (
        <Main
          data={filteredTodos}
          setData={setData}
          // todoFilter={todoFilter}
        />
      )}

      {data.length > 0 && (
        <Footer
          data={data}
          setData={setData}
          // todoFilter={todoFilter}
          // filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
        />
      )}
    </div>
  );
};

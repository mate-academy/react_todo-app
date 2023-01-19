/* eslint-disable jsx-a11y/control-has-associated-label */
// import { count } from 'console';
import React, { useState, useEffect } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { Todo } from './types/Todo';
import { useLocalStorage } from './components/localstorage';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useLocalStorage('data', []);
  const [filterTodos, setFilterTodos] = useState<Todo[]>(data);

  useEffect(() => {
    setFilterTodos(data);
  }, [data]);

  return (
    <div className="todoapp">
      <Header
        input={input}
        setInput={setInput}
        data={data}
        setData={setData}
      />

      {filterTodos && (
        <Main
          data={filterTodos}
          setData={setData}
        />
      )}

      {data.length > 0 && (
        <Footer
          data={data}
          setData={setData}
          setFilterTodos={setFilterTodos}
        />
      )}
    </div>
  );
};

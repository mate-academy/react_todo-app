/* eslint-disable jsx-a11y/control-has-associated-label */
// import { count } from 'console';
import React, { useState, useEffect } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  // const [data, setData] = useState<Todo[]>([]);

  const useLocalStorage = (key:string, initialValue: any) => {
    const firstValue = localStorage.getItem(key);
    const jsonValue = firstValue !== null
      ? JSON.parse(firstValue)
      : initialValue;
    const [data, setData] = useState(jsonValue);
    // JSON.parse(firstValue) || initialValue,

    const save = (value: any) => {
      setData(value);
      localStorage.setItem('data', JSON.stringify(value));
    };

    return [data, save];
  };

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

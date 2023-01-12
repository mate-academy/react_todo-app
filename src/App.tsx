/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  return (
    <div className="todoapp">
      <Header
        input={input}
        setInput={setInput}
        data={data}
        setData={setData}
      />

      <Main
        data={data}
        setData={setData}
      />

      <Footer />
    </div>
  );
};

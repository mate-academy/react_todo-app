import React from 'react';

import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';

import { Context } from '../ContextProvider';

export const TodoApp = () => {
  const { todos } = React.useContext(Context);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <div>
          <Main />
          <Footer />
        </div>
      )}
    </div>
  );
};

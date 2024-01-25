import React, { useContext } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Main } from '../Main';
import { TodoContext } from '../../context/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const itemsLeft = todos.reduce((acc, cur) => {
    if (!cur.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const isClearButtonVisible = todos.some(({ completed }) => completed);

  return (
    <div className="todoapp">
      <Header />
      {!!todos.length && (
        <>
          <Main />
          <Footer
            itemsLeft={itemsLeft}
            isClearButtonVisible={isClearButtonVisible}
          />
        </>
      )}
    </div>
  );
};

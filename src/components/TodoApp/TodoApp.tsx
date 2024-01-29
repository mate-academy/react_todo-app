import React, { useContext } from 'react';
import { Main } from '../Main';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { TodoContext } from '../../context/TodoContext';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodoContext);

  const clearButtonVisible = todos.some(({ completed }) => completed);

  const itemsLeft = todos.filter(({ completed }) => {
    return !completed;
  }).length;

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <Main />
          <Footer
            itemsLeft={itemsLeft}
            clearButtonVisible={clearButtonVisible}
          />
        </>
      )}
    </div>
  );
};

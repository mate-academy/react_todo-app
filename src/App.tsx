/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import Header from './Conponents/Header/Header';
import TodoLists from './Conponents/TodoLists/TodoList';
import Footer from './Conponents/Footer/Footer';
import { TodoContext } from './Context/Context';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoLists />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};

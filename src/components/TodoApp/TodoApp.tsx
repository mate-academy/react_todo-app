import React, { useContext } from 'react';

import './TodoApp.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import { TodosContext } from '../../contexts/TodosContext';

const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <Main />

          <Footer />
        </>
      )}
    </div>
  );
};

export default TodoApp;

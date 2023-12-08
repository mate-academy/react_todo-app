import React from 'react';

import './TodoApp.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

const TodoApp: React.FC = () => {
  return (
    <div className="todoapp">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};

export default TodoApp;

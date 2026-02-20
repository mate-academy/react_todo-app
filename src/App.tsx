/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useReducer } from 'react';
import { Footer } from './components/footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './header/Header';
import { SortContext } from './store/SortContext';
import { SortReducer } from './store/SortReducer';
import { TodoContext } from './store/TodoContext';
import { TodoReducer } from './store/TodoReducer';

export const App: React.FC = () => {
  const [todos, dispatch] = useReducer(TodoReducer, [
    {
      id: 1,
      title: 'Not Completed Todo',
      completed: true,
    },
    {
      id: 2,
      title: 'Todo',
      completed: false,
    },
    {
      id: 3,
      title: 'Completed Todo',
      completed: false,
    },
  ]);
  const [sortBy, sortDispatch] = useReducer(SortReducer, 'all');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoContext.Provider value={{ todos, dispatch }}>
          <SortContext.Provider value={{ sortBy, sortDispatch }}>
            <Header />
            <TodoList />
            {todos.length > 0 && <Footer />}
          </SortContext.Provider>
        </TodoContext.Provider>
      </div>
    </div>
  );
};

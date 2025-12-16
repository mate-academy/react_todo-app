/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { RefsContext } from './contexts/RefsContext';
import { TodosContext } from './contexts/TodosContext';

export const App: React.FC = () => {
  const { newTodoRef, selectedTodoRef } = React.useContext(RefsContext);
  const { todos } = React.useContext(TodosContext);

  useEffect(() => {
    if (selectedTodoRef && selectedTodoRef.current) {
      selectedTodoRef.current.focus();
    } else if (newTodoRef && newTodoRef.current) {
      newTodoRef.current.focus();
    }
  }, [selectedTodoRef, newTodoRef]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        {todos.length > 0 && <TodoFooter />}
      </div>
    </div>
  );
};

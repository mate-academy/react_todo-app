import React, { useContext, useMemo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodoContext } from './TodoContext';
import { Status } from '../services/EnumStatusFilter';

export const TodoApp: React.FC = () => {
  const { todos, selTodoFilterList } = useContext(TodoContext);

  const filterTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (selTodoFilterList) {
        case Status.ACTIVE: return !completed;
        case Status.COMPLETED: return completed;
        default: return true;
      }
    });
  }, [todos, selTodoFilterList]);

  return (
    <div className="todoapp">
      <Header />
      {
        !!todos.length && (
          <>
            <TodoList filterTodos={filterTodos} />
            <Footer />
          </>
        )
      }
    </div>
  );
};

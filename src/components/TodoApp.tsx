import React, { useContext, useMemo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodoContext } from './TodoContext';
import { Status } from '../services/EnumStatusFilter';

export const TodoApp: React.FC = () => {
  const { todos, selectTodoFilteredList } = useContext(TodoContext);

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      const { completed } = todo;

      switch (selectTodoFilteredList) {
        case Status.ALL: return true;
        case Status.ACTIVE: return !completed;
        case Status.COMPLETED: return completed;
        default: return true;
      }
    });
  }, [todos, selectTodoFilteredList]);

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

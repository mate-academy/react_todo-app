import React, { useContext, useMemo } from 'react';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { TodoContext } from './Components/TodoContext';
import { SortingTodos } from './enums/Sortings';
import { Todo } from './Types/Todo';

export const App: React.FC = () => {
  const { todos, tab } = useContext(TodoContext);

  const filteredTodos = useMemo((): Todo[] => {
    switch (tab) {
      case SortingTodos.completed:
        return todos.filter(t => t.completed === true);
      case SortingTodos.active:
        return todos.filter(t => t.completed === false);
      default:
        return todos;
    }
  }, [todos, tab]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} />
        </section>

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};

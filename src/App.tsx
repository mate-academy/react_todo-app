import React, { useContext } from 'react';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { TodoContext } from './Components/TodoContext';
import { SortingTodos } from './enums/Sortings';
import { Todo } from './Types/Todo';

export const App: React.FC = () => {
  const { todo, tab } = useContext(TodoContext);

  const filteredTodos = (): Todo[] => {
    switch (tab) {
      case SortingTodos.completed:
        return todo.filter(t => t.status === true);
      case SortingTodos.active:
        return todo.filter(t => t.status === false);
      default:
        return todo;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos()} />
        </section>

        {todo.length > 0 && <Footer todos={todo} />}
      </div>
    </div>
  );
};

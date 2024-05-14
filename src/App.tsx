import React, { useContext } from 'react';
import { TodosContext } from './context/ToDosContext';
import { SortType } from './types/types';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/ToDoList/ToDoList';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  const { todos, sorted } = useContext(TodosContext);

  const visibleTodos = (() => {
    switch (sorted) {
      case SortType.Active:
        return todos.filter(todo => !todo.completed);
      case SortType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  })();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};

import { useState } from 'react';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { FilterType } from './types/Filter';
import { useTodosContext } from './context/TodosContext';

export const App: React.FC = () => {
  const [filterType, setFilterType] = useState(FilterType.All);
  const { todos } = useTodosContext();

  const visibleTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.All:
        return true;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && <TodoList todos={visibleTodos} />}

        {todos.length > 0 && (
          <TodoFooter filterType={filterType} onFilterChange={setFilterType} />
        )}
      </div>
    </div>
  );
};

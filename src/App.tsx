import React, { useContext, useMemo, useState } from 'react';
import { TodoApp } from './Components/TodoApp';
import { TodoList } from './Components/TodoList';
import { TodosFilter } from './Components/TodosFilter';
import { TodosContext } from './Context/TodosProvider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'completed'>(
    'all',
  );

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterType]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp title={title} setTitle={setTitle} />
      </header>
      <TodoList todos={filteredTodos} />
      {todos.length !== 0 && <TodosFilter handleFiltering={setFilterType} />}
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import { Todo } from './types/TodoType';
import { TodoApp } from './Components/TodoApp';
import { TodoList } from './Components/TodoList';
import { TodosFilter } from './Components/TodosFilter';
import { TodosContext } from './Context/TodosProvider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const [name, setName] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp name={name} setName={setName} />
      </header>
      <TodoList todos={filteredTodos} />
      {todos.length !== 0 && <TodosFilter handleFiltering={setFilteredTodos} />}
    </div>
  );
};

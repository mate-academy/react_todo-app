import React, { useContext, useState } from 'react';
import { TodoForm } from './Components/TodoForm/TodoForm';
import { Footer } from './Components/Footer/Footer';
import { Filter } from './types/Filter';
import { TodoList } from './Components/TodoList/TodoList';
import { StateContext } from './GlobalProvider/GlobalProvider';
import { getFilteredTodos } from './Components/FilteredTodos/FilteredTodos';

export const App: React.FC = () => {
  const todos = useContext(StateContext);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        <TodoList filteredTodos={filteredTodos} />

        {todos.length > 0 && <Footer filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};

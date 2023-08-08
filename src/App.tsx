import { useContext } from 'react';
import { TodosContext } from './store/TodosContext';
import { TodosForm } from './components/TodosForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export const App = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodosForm />
      </header>
      {todos.length > 0 && (
        <>
          <TodoList />
          <TodosFilter />
        </>
      )}
    </div>
  );
};

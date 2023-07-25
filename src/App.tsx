import { useContext } from 'react';
import { StateContext } from './Components/Store';
import { TodoApp } from './Components/TodoApp';
import { TodoList } from './Components/TodoList';
import { TodosFilter } from './Components/TodosFilter';

export const App: React.FC = () => {
  const { todoList } = useContext(StateContext);

  return (
    <div className="todoapp">
      <TodoApp />

      <TodoList />

      {todoList.length > 0 && (
        <TodosFilter />
      )}
    </div>
  );
};

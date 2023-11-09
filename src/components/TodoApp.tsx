import { useContext } from 'react';
import { TodosContext } from '../services/Store';
import { TodoAppHeader } from './TodoAppHeader';
import { TodoAppList } from './TodoAppList';
import { TodoFooter } from './TodoFooter';

export const TodoApp: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodoAppHeader />
      {todos.length > 0 && (
        <>
          <TodoAppList />
          <TodoFooter />
        </>
      )}
    </div>
  );
};

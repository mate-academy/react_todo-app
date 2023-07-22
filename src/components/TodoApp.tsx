import { FC } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { useTodoContext } from '../hooks/useTodoContext';

export const TodoApp: FC = () => {
  const { todosCount } = useTodoContext();

  return (
    <div className="todoapp">
      <TodoForm />

      {todosCount > 0 && (
        <>
          <TodoList />
          <TodosFilter />
        </>
      )}
    </div>
  );
};

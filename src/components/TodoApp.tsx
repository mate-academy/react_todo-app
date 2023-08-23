import { useContext } from 'react';
import { Header } from './Header';
import { StateContext } from '../context/StateContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const { value: todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <TodoList />
          <TodosFilter />
        </>
      )}
    </div>
  );
};

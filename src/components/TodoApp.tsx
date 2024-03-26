import { TodoHeader } from './TodoHeader';
import { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';
import { TodosContext } from './TodosContext';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);

  return (
    <>
      <TodoHeader />

      <TodoList />

      {!!todos.length && <TodoFooter />}
    </>
  );
};

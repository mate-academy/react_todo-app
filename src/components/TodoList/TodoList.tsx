import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../context/TodosContext';

export const ToodList = () => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {!!todos.length && <TodoItem />}
    </section>
  );
};

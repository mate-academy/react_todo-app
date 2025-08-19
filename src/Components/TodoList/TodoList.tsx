/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { FilterContext } from '../../Context/FilterContext';

export const TodoList = () => {
  const { filteredTodoList } = useContext(FilterContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodoList.map(todoItem => (
        <TodoItem key={todoItem.id} todoItem={todoItem} />
      ))}
    </section>
  );
};

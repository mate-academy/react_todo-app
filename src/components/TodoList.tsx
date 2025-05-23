import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  items: Todo[] | [];
};

const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {items.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </section>
  );
};

export default TodoList;

// import { OrderItems } from '../types/Type';
import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { filterTodos } from './FilterTodos';
import { TodoContext } from '../context/TodosContext';

// interface Props {
//   items: OrderItems[];
// }

// export const TodoList: React.FC<Props> = ({ items }) => {
export const TodoList: React.FC = () => {
  const { orderItems, status } = useContext(TodoContext);
  const visibleItems = filterTodos(orderItems, status);
  // console.log('🚀 ~ handleClickKeybord ~ orderItems:', orderItems);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleItems.map(item => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </ul>
  );
};

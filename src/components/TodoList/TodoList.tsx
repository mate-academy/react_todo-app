/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams } from 'react-router-dom';
import { FilterBy } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem';

type Props = {
  items: Todo[],
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoList: React.FC<Props> = ({ items, setItems }) => {
  const { filter } = useParams();

  const getVisibleItems = (
    todos: Todo[],
    filterBy: string,
  ) => todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const visibleItems = filter ? getVisibleItems(items, filter) : [...items];

  return (
    <ul className="todo-list" data-cy="todo-list">
      {visibleItems.map(item => (
        <TodoItem item={item} key={item.id} setItems={setItems} />
      ))}
    </ul>
  );
};

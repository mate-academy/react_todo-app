import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import { TodoListProps } from '../../constants/proptypes';

const TodoList = ({
  todos,
  onDeleted,
  onToggleDone,
}) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <TodoListItem
        id={id}
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

TodoList.propTypes = TodoListProps;

export default TodoList;

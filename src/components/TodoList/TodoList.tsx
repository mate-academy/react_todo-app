// import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC<TodoListProps> = ({
  items, editTodoTitle, editCompletedStatus,
}) => {
  return (
    <ul className="todo-list">
      {
        items.map((item, index) => (
          <TodoItem
            key={item.id}
            todo={item}
            index={index}
            editTodoTitle={editTodoTitle}
            editCompletedStatus={editCompletedStatus}
          />
        ))
      }
    </ul>
  );
};

export default TodoList;

import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todosList, onChangeCompleted }) => (
  <ul className="todo-list">
    {todosList.length
      ? todosList
        .map(({ title, completed, id }) => (
          <TodoItem
            todoStatus={completed}
            todoTitle={title}
            onChangeCompleted={onChangeCompleted}
            key={id}
            todoId={id}
          />
        ))
      : null
    }
  </ul>
);

export default TodoList;

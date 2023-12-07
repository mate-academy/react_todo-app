import React, { useContext, useState } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../../contexts/TodoContext';

export const TodoList: React.FC = () => {
  const { todoListToShow, dispatch } = useContext(TodoContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const handleDoubleClick = (todoId: number) => {
    setEditingTodoId(todoId);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => dispatch({ type: 'toggleAllTodoStatus' })}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todoListToShow.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingTodoId === todo.id}
            onDoubleClick={() => handleDoubleClick(todo.id)}
            onCancelEditing={cancelEditing}
          />
        ))}
      </ul>
    </>
  );
};

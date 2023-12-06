import React, { useState } from 'react';

import { Todo } from '../../types/interfaces';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todoList: Todo[];
  destroyTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
  toggleAll: () => void;
  handleEditTodo: (id: number, newTitle: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  destroyTodo,
  toggleTodoStatus,
  toggleAll,
  handleEditTodo,
}) => {
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
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            destroyTodo={destroyTodo}
            toggleTodoStatus={toggleTodoStatus}
            handleEditTodo={handleEditTodo}
            isEditing={editingTodoId === todo.id}
            onDoubleClick={() => handleDoubleClick(todo.id)}
            onCancelEditing={cancelEditing}
          />
        ))}
      </ul>
    </>
  );
};

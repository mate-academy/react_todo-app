import React from 'react';
import { Todo } from '../type/Todo';
import { TodoItem } from './todoItems';

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
  handleEditStart: (id: number) => void;
  cancelEditing: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  editingId,
  toggleTodo,
  removeTodo,
  updateTodoTitle,
  handleEditStart,
  cancelEditing,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editing={editingId === todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodoTitle={updateTodoTitle}
          handleEditStart={handleEditStart}
          cancelEditing={cancelEditing}
        />
      ))}
    </section>
  );
};

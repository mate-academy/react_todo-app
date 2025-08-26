import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  isLoading: boolean;
  deleteTodo: (todo: number) => void;
  tempTodo: Todo | null;
  deletingTodoIds: number[];
  updatingTodoIds: number[];
  editingTodoId: number | null;
  startEditing: (todoId: number) => void;
  cancelEditing: () => void;
  updateTodo: (todoId: number, title: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  // isLoading,
  deleteTodo,
  tempTodo,
  deletingTodoIds,
  updatingTodoIds,
  editingTodoId,
  startEditing,
  cancelEditing,
  updateTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          isLoading={
            deletingTodoIds.includes(todo.id) ||
            updatingTodoIds.includes(todo.id)
          }
          deleteTodo={deleteTodo}
          startEditing={() => startEditing(todo.id)}
          cancelEditing={cancelEditing}
          updateTodo={title => updateTodo(todo.id, title)}
          isEditing={editingTodoId === todo.id}
        />
      ))}

      {tempTodo && (
        <TodoItem
          key="temp"
          todo={tempTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          isLoading={true}
          isEditing={false}
          startEditing={() => {}}
          cancelEditing={cancelEditing}
          updateTodo={() => {}}
        />
      )}
    </section>
  );
};

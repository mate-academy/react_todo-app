import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { Todo } from '../Context';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editingTodoId: string | null;
  setEditingTodoId: Dispatch<SetStateAction<string | null>>;
  redact: string;
  setRedact: Dispatch<SetStateAction<string>>;
  editInputRef: RefObject<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement>;
  handleSave: (id: string) => void;
  handleEditSubmit: (event: React.FormEvent, id: string) => void;
  cancelEditing: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editingTodoId,
  setEditingTodoId,
  redact,
  setRedact,
  editInputRef,
  inputRef,
  handleSave,
  handleEditSubmit,
  cancelEditing,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
          redact={redact}
          setRedact={setRedact}
          editInputRef={editInputRef}
          inputRef={inputRef}
          handleSave={handleSave}
          handleEditSubmit={handleEditSubmit}
          cancelEditing={cancelEditing}
        />
      ))}
    </section>
  );
};

import React from 'react';
import { TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const NewTodo: React.FC<Props> = ({ todo }) => {
  const { setTodos, editingTitle, setEditingTitle, setEditingId, deleteTodo } =
    React.useContext(TodoContext)!;

  const updateOnBlur = (id: number, newTitle: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)),
    );
  };

  return (
    <input
      data-cy="TodoTitleField"
      type="text"
      className="todo__title-field"
      value={editingTitle}
      autoFocus
      onChange={e => setEditingTitle(e.target.value)}
      onBlur={() => {
        const trimmed = editingTitle.trim();

        if (trimmed) {
          updateOnBlur(todo.id, trimmed);
        } else {
          deleteTodo(todo.id);
        }

        setEditingId(null);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          (e.target as HTMLInputElement).blur();
        }
      }}
      onKeyUp={e => {
        if (e.key === 'Escape') {
          setEditingId(null);
        }
      }}
    />
  );
};

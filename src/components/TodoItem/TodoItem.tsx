import React, {
  useState, useEffect, useRef, useCallback, useContext,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';
import { Todo } from '../../styles/types';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const {
    handleDestroy, setAllTodos, allTodos,
  } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const editField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [editing]);

  const updateTodo = useCallback((updatedTodo: Todo, newTitle: string) => {
    if (newTitle.trim() === '') {
      handleDestroy(updatedTodo.id);

      return;
    }

    const newTodos = allTodos.map((t) => (
      t.id === updatedTodo.id ? { ...t, title: newTitle } : t
    ));

    setAllTodos(newTodos);
  }, [allTodos, setAllTodos, handleDestroy]);

  const handlerKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodo(todo, editedTitle);
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setEditing(false);
    }
  };

  const handleBlur
  = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault();
    updateTodo(todo, editedTitle);
    setEditing(false);
  };

  const completeTodo = () => {
    const updatedTodos = allTodos.map((t) => (
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    ));

    setAllTodos(updatedTodos);
  };

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={completeTodo}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDestroy(id)}
          aria-label="delete"
        />
      </div>
      {editing && (
        <input
          data-cy="TodoTitleField"
          ref={editField}
          type="text"
          className="edit"
          value={editedTitle}
          onKeyUp={handlerKey}
          onChange={(event) => setEditedTitle(event.target.value)}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};

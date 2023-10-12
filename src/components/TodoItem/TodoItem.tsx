import React, { useRef, useState } from 'react';
import cl from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoItem: React.FC<Props> = ({
  todos,
  todo,
  setTodos,
}) => {
  const [changedElement, setChangedElement] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTodoChange = () => {
    let updatedTodos = [...todos];

    updatedTodos = updatedTodos.map(elem => {
      if (elem.id === editId) {
        return { ...elem, title: changedElement };
      }

      return elem;
    });

    setTodos(updatedTodos);
    setEditId(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyDown = event.key;

    if (keyDown === 'Enter') {
      handleTodoChange();
    }

    if (keyDown === 'Escape') {
      setEditId(null);
    }
  };

  const handleCompleted = (elem: number | undefined) => {
    const updatedTodos: Todo[] = todos.map(item => {
      if (item.id === elem) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (elem: Todo) => {
    const updatedTodos = todos.filter(item => item.id !== elem.id);

    setTodos(updatedTodos);
  };

  const handleDoubleClick = (id: number | undefined) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const selectedTodo = todos.find(elem => elem.id === id);

    if (selectedTodo && selectedTodo.title) {
      setChangedElement(selectedTodo.title);
      if (id) {
        setEditId(id);
      }
    }
  };

  return (
    <li
      key={todo.id}
      onDoubleClick={() => handleDoubleClick(todo.id)}
      className={cl(
        { editing: editId === todo.id },
        { completed: todo.completed },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={() => handleCompleted(todo.id)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          aria-label="deleteTodo"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={changedElement || ''}
        onChange={(event) => {
          setChangedElement(event.target.value);
        }}
        onBlur={handleTodoChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
    </li>
  );
};

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
      className={cl({ editing: editId === todo.id })}
    >
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view" />
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
        ref={inputRef}
      />
    </li>
  );
};

import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import cl from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoItem: React.FC<Props> = React.memo(({
  todos,
  todo,
  setTodos,
}) => {
  const [changedElement, setChangedElement] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyDown = event.key;

    if (keyDown === 'Enter') {
      handleTodoChange();
      setIsEditing(false);
      setFocus(false);
    }

    if (keyDown === 'Escape') {
      setEditId(null);
      setIsEditing(false);
      setFocus(false);
    }
  };

  const handleCompleted = (elem: Todo) => {
    const updatedTodos: Todo[] = todos.map(item => {
      if (item.id === elem.id) {
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

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleDoubleClick = useCallback((elem: Todo) => {
    const selectedTodo = todos.find(item => item.id === elem.id);

    if (selectedTodo && selectedTodo.title) {
      setChangedElement(selectedTodo.title);
      if (elem.id) {
        setEditId(elem.id);
      }
    }

    setIsEditing(true);
    setFocus(true);
  }, [todos, setChangedElement, setEditId, inputRef, setIsEditing, setFocus]);

  return (
    <li
      key={todo.id}
      onDoubleClick={() => handleDoubleClick(todo)}
      className={cl(
        { editing: isEditing },
        { completed: todo.completed },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          onClick={() => handleCompleted(todo)}
        />
        <label>{todo.title}</label>
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
});

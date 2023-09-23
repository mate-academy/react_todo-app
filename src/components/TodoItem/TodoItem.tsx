import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import className from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  item: Todo,
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const { setTodos } = useContext(TodosContext);
  const [isEditable, setIsEditable] = useState(false); // флаг редактирования
  const [editedTodo, setEditedTodo] = useState(title);
  // редактируемый todo содержит измененное значение заголовка задачи,
  //  когда она редактируется

  const inputRef = useRef<HTMLInputElement>(null); // ссылка на input

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus(); // фокус на input
    }
  }, [isEditable]);

  const handleChangeStatusTodo = () => {
    setTodos(currentTodos => (
      currentTodos.map(currentTodo => (
        currentTodo.id === id
          ? {
            ...currentTodo,
            completed: !currentTodo.completed,
          }
          : currentTodo
      ))
    ));
  };

  const handleRemoveTodo = () => {
    setTodos(currentTodos => (
      currentTodos.filter(currentTodo => currentTodo.id !== id)
    ));
  };

  const saveChanges = () => {
    setTodos(currentTodos => (
      currentTodos.map(currentTodo => (
        currentTodo.id === id
          ? {
            ...currentTodo,
            title: editedTodo,
          }
          : currentTodo
      ))
    ));

    setIsEditable(false);
  };

  const handleKeyboardAction = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditedTodo(title);
      setIsEditable(false);
    }

    if (e.key === 'Enter') {
      if (editedTodo.trim().length) {
        saveChanges();
      } else {
        handleRemoveTodo();
      }
    }
  };

  return (
    <li className={className({
      completed: item.completed,
      editing: isEditable,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChangeStatusTodo}
        />
        <label
          onDoubleClick={() => setIsEditable(true)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemoveTodo}
        >
          Delete
        </button>


      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={editedTodo}
        onChange={e => setEditedTodo(e.target.value)}
        onKeyUp={handleKeyboardAction}
        onBlur={saveChanges}
      />
    </li>
  );
};

import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import { Todo } from '../../types/Todo';
import CloseButton from '../UI/CloseButton';
import { TodosContext } from '../../contexts/TodosContext';

interface Props {
  todo: Todo,
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);

  const editingInput = useRef<HTMLInputElement>(null);
  const lastPressedKey = useRef('');

  const completedClass = completed && 'completed';
  const editingClass = isEditing && 'editing';

  useEffect(() => {
    if (isEditing && editingInput.current) {
      editingInput.current.focus();
      editingInput.current.value = title;
    }
  }, [isEditing, title]);

  const deleteTask = () => {
    setTodos(
      (prevTodos: Todo[]) => prevTodos.filter(currTodo => currTodo.id !== id),
    );
  };

  const saveChanges = () => {
    setIsEditing(false);
    const inputValue = editingInput.current?.value.trim();

    if (!inputValue) {
      deleteTask();

      return;
    }

    setTodos((prevTodos: Todo[]) => {
      const newTodo = {
        ...todo,
        title: inputValue,
      };

      const todoIndex = prevTodos.findIndex(currTodo => currTodo.id === id);

      return [
        ...prevTodos.slice(0, todoIndex),
        newTodo,
        ...prevTodos.slice(todoIndex + 1, prevTodos.length),
      ];
    });
  };

  const cancelChanges = () => {
    setIsEditing(false);
  };

  const handleInputBlur = () => {
    switch (lastPressedKey.current) {
      case 'Enter':
        saveChanges();
        break;
      case 'Escape':
        cancelChanges();
        break;
      default:
        saveChanges();
        break;
    }

    lastPressedKey.current = '';
  };

  const handleInputKeyUp = (event: React.KeyboardEvent) => {
    lastPressedKey.current = event.key;

    if (['Enter', 'Escape'].includes(event.key)) {
      editingInput.current?.blur();
    }
  };

  const handleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prevTodos: Todo[]) => {
      const newTodo = {
        ...todo,
        completed: event.target.checked,
      };

      const todoIndex = prevTodos.findIndex(currTodo => currTodo.id === id);

      return [
        ...prevTodos.slice(0, todoIndex),
        newTodo,
        ...prevTodos.slice(todoIndex + 1, prevTodos.length),
      ];
    });
  };

  return (
    <li className={`${editingClass || completedClass}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
          checked={completed}
          onChange={handleCompleted}
        />

        <label
          htmlFor={`todo-${id}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>

        <CloseButton onClick={deleteTask} />
      </div>

      <input
        type="text"
        className="edit"
        ref={editingInput}
        onBlur={handleInputBlur}
        onKeyUp={handleInputKeyUp}
      />
    </li>
  );
};

export default TodoItem;

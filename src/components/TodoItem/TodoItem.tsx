import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  const handleCompleteTodo = () => {
    const currentTodos = [...todos];
    const index = currentTodos
      .findIndex((curTodo: Todo) => curTodo.id === todo.id);

    if (index !== -1) {
      const currentState = currentTodos[index].completed;

      currentTodos[index] = {
        ...currentTodos[index],
        completed: !currentState,
      };
      setTodos(currentTodos);
    }
  };

  const handleDeleteTodo = () => {
    const currentTodos = [...todos];
    const index = currentTodos
      .findIndex((curTodo: Todo) => curTodo.id === todo.id);

    if (index !== -1) {
      currentTodos.splice(index, 1);
      setTodos(currentTodos);
    }
  };

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }

    setNewTitle(todo.title);
  }, [isEditing, todo.title]);

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSaveOnBlur = () => {
    const updatedTodos = [...todos];

    if (newTitle.trim()) {
      const index = updatedTodos
        .findIndex(item => item.id === todo.id);

      updatedTodos[index] = {
        ...updatedTodos[index],
        title: newTitle,
      };

      setTodos(updatedTodos);
    } else {
      setTodos(updatedTodos.filter(curTodo => curTodo.id !== todo.id));
    }

    setNewTitle('');
    setIsEditing(false);
  };

  const handleEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isEditing) {
      handleSaveOnBlur();
    } else
    if (event.key === 'Escape' && isEditing) {
      setNewTitle('');
      setIsEditing(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={cn({
        completed: todo.completed,
        editing: isEditing,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={handleCompleteTodo}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleEditTitle}
        onBlur={handleSaveOnBlur}
        onKeyUp={handleEditTodo}
      />
    </li>
  );
};

import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  const handleMarkTodoAsCompleted = (id: number) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos
      .filter(deletedTodo => deletedTodo.id !== id));
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
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id={`toggle-view${todo.id}`}
          onClick={() => handleMarkTodoAsCompleted(todo.id)}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => handleDeleteTodo(todo.id)}
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

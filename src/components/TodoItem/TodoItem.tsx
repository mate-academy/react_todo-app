/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

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

  const handeEditTodoTitle = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    if (isEditing) {
      if (newTitle !== '') {
        const updatedTodos = [...todos];
        const currentTodoIndex = updatedTodos
          .findIndex((elem: Todo) => elem.id === todo.id);

        if (currentTodoIndex !== -1) {
          updatedTodos[currentTodoIndex] = {
            ...updatedTodos[currentTodoIndex],
            title: newTitle.trim(),
          };
          updatedTodos
            .splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);

          setTodos(updatedTodos);
        }
      } else {
        setTodos(currentTodos => currentTodos
          .filter(elem => elem.id !== todo.id));
      }
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    } else if (event.key === 'Enter' && isEditing) {
      handleTitleBlur();
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id={todo.completed ? 'toggle-completed' : 'toggle-view'}
          onClick={() => handleMarkTodoAsCompleted(todo.id)}
        />
        <label onDoubleClick={handeEditTodoTitle}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo.id)}
        />
      </div>
      <input
        ref={ref}
        type="text"
        className="edit"
        value={newTitle}
        onBlur={handleTitleBlur}
        onChange={handleTitleChange}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};

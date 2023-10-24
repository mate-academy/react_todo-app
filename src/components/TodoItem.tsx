/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Todo, TodosContext } from '../TodosContext';

export const TodoItem: React.FC<{ myTodo: Todo }> = ({ myTodo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(myTodo.title);

  const DELETE = 'delete';
  const CHANGE = 'change';
  const CHANGE_NAME = 'changeName';

  const onChange = (todoEdit: Todo, value: string, string = 'default') => {
    let updatedTodos;

    switch (value) {
      case 'delete':
        setTodos(todos.filter(todo => todo.id !== todoEdit.id));
        break;
      case 'change':
        updatedTodos = todos.map(todo => {
          if (todo.id === todoEdit.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        });

        setTodos(updatedTodos);
        break;

      case 'changeName':
        updatedTodos = todos.map(todo => {
          if (todo.id === todoEdit.id) {
            return { ...todo, title: string };
          }

          return todo;
        });

        setTodos(updatedTodos);
        break;
      default:
    }
  };

  const handleBlur = (todoEdit: Todo) => {
    if (editedText.trim() === '') {
      onChange(todoEdit, DELETE);
    } else {
      onChange(todoEdit, CHANGE_NAME, editedText);
    }

    setIsEditing(false);
  };

  const handleKeyPress = (todoEdit: Todo, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur(todoEdit);
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      key={myTodo.id}
      className={classNames({
        completed: myTodo.completed,
        editing: isEditing,
      })}
    >
      <div className={classNames({ view: !isEditing })}>
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${myTodo.completed ? '-completed' : ''}`}
          onChange={() => onChange(myTodo, CHANGE)}
          checked={myTodo.completed}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
            onBlur={() => handleBlur(myTodo)}
            onKeyDown={(e) => handleKeyPress(myTodo, e)}
          />
        ) : (
          <label onDoubleClick={() => setIsEditing(true)}>
            {myTodo.title}
          </label>
        )}
        {!isEditing && (
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => onChange(myTodo, DELETE)}
          />
        )}
      </div>
    </li>
  );
};

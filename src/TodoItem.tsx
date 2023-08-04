import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoContextType, TodosContext } from './TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext<TodoContextType>(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleDeleteTodo = () => {
    setTodos(oldTodos => oldTodos.filter(oldTodo => oldTodo.id !== todo.id));
  };

  const handleSubmit = () => {
    if (title.length > 0) {
      setTodos(oldTodos => oldTodos.map(todo_ => ({
        ...todo_,
        title,
      })));
    } else {
      setTitle('');
      handleDeleteTodo();
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => (
    setTitle(e.target.value));

  const handleToggle = () => {
    setTodos(oldTodos => oldTodos.map(oldTodo => {
      if (oldTodo.id === todo.id) {
        return {
          ...oldTodo,
          completed: !todo.completed,
        };
      }

      return oldTodo;
    }));
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggle}
          checked={todo.completed}
        />
        {!isEditing && <label>{title}</label>}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        onKeyUp={handleKeyUp}
        value={title}
        onChange={handleChangeTitle}
        onBlur={handleSubmit}
      />
    </li>
  );
};

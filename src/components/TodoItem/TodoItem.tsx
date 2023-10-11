/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const hendleStartEditTodo = () => {
    setEditTitle(todo.title);
    setIsEditing(true);

    setTimeout(() => {
      if (titleField.current !== null) {
        titleField.current.focus();
      }
    }, 0);
  };

  const handlerEditTodoOnBlur = () => {
    if (isEditing) {
      if (!editTitle) {
        setTodos(
          prevTodos => prevTodos.filter(element => element.id !== todo.id),
        );
      }

      if (editTitle) {
        const updeteTodos = [...todos];
        const indexTodo = updeteTodos.findIndex(
          (el: Todo) => el.id === todo.id,
        );

        updeteTodos[indexTodo] = {
          ...updeteTodos[indexTodo],
          title: editTitle.trim(),
        };

        updeteTodos.splice(indexTodo, 1, updeteTodos[indexTodo]);

        setTodos(updeteTodos);
      }
    }

    setIsEditing(false);
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    } else if (event.key === 'Enter' && isEditing) {
      handlerEditTodoOnBlur();
    }
  };

  useEffect(() => {
    if (titleField.current && editTitle) {
      titleField.current.focus();
    }
  }, [editTitle]);

  const handleDeleteTodo = () => {
    setTodos(prevTodos => prevTodos.filter(element => element.id !== todo.id));
  };

  const handleSetCompleted = () => {
    const updatedTodos = [...todos];
    const indexTodo = updatedTodos.findIndex((el: Todo) => el.id === todo.id);

    updatedTodos[indexTodo] = {
      ...updatedTodos[indexTodo],
      completed: !updatedTodos[indexTodo].completed,
    };

    setTodos(updatedTodos);
  };

  return (
    <li className={cn({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={handleSetCompleted}
        />

        <label onDoubleClick={hendleStartEditTodo}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        ref={titleField}
        type="text"
        className="edit"
        value={editTitle}
        onChange={handleEditTitle}
        onKeyUp={handlerKeyUp}
        onBlur={handlerEditTodoOnBlur}
      />
    </li>
  );
};

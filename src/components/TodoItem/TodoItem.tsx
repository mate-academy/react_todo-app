import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleComplete = (todoId: string) => {
    setTodos(todos.map((currTodo: Todo) => {
      return currTodo.id === todoId
        ? { ...currTodo, completed: !currTodo.completed }
        : currTodo;
    }));
  };

  const handleDelete = (todoId: string) => {
    setTodos(todos.filter((currentTodo: Todo) => currentTodo.id !== todoId));
  };

  const handleEdit = (
    value: string,
    todoId: string,
  ) => {
    if (value) {
      setTodos(todos.map((currTodo: Todo) => {
        return currTodo.id === todoId
          ? { ...currTodo, title: newTitle }
          : currTodo;
      }));
      setIsEditable(false);
    } else {
      handleDelete(todoId);
      setIsEditable(false);
    }
  };

  const handleKeyUpEdit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string,
  ) => {
    if (e.key === 'Enter') {
      handleEdit(e.target.value, todoId);
    }

    if (e.key === 'Escape') {
      setIsEditable(false);
    }
  };

  const editRef = useRef<HTMLInputElement>(null);
  let editTimerId = 0;

  useEffect(() => {
    if (isEditable) {
      editTimerId = window.setTimeout(() => {
        editRef.current?.focus();
      }, 0);
    }

    return () => {
      window.clearTimeout(editTimerId);
    };
  }, [isEditable]);

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditable,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleComplete(todo.id)}
        />
        <label
          onDoubleClick={() => setIsEditable(true)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          aria-label="Delete button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editRef}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={(e) => handleKeyUpEdit(e, todo.id)}
        onBlur={(e) => handleEdit(e.target.value, todo.id)}
      />
    </li>
  );
};

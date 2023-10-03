import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
  key: number,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  key,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [deleted, setDeleted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && editing) {
      titleField.current.focus();
    }
  }, [editing]);

  function getTodoById(todoId: number): Todo | null {
    return todos.find((item: Todo) => item.id === todoId) || null;
  }

  const handleCheckboxClick = () => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return item;
    }));
  };

  const handleDelete = () => {
    const todoToUpdate = getTodoById(todo.id);

    if (todoToUpdate) {
      setTodos(todos.filter(obj => obj !== todoToUpdate));
    }

    setDeleted(true);
  };

  const handleTitleEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleTitleSubmit = (PressedKey: string) => {
    const todoToUpdate = getTodoById(todo.id);

    if (!todoTitle && (PressedKey === 'Enter')) {
      handleDelete();
    }

    if ((PressedKey === 'Enter') && todoToUpdate) {
      (todoToUpdate.title = todoTitle);
    }

    if ((PressedKey === 'Escape') && todoToUpdate) {
      setTodoTitle(todo.title);
    }

    setEditing(false);
  };

  const handleBlur = () => {
    if (editing) {
      handleTitleSubmit('Enter');
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <li
      key={key}
      className={cn({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={handleCheckboxClick}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
        <button
          aria-label="button"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={todoTitle}
        onChange={handleTitleEditing}
        onKeyDown={(e) => {
          if ((e.key === 'Enter') || (e.key === 'Escape')) {
            handleTitleSubmit(e.key);
          }
        }}
        onBlur={handleBlur}
      />
    </li>
  );
};

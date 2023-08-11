import React, {
  useState, useContext, useRef, useCallback, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { todos, setTodos, setChecked } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedTitle = title.trim();

  const handleCheckedTodo = (todoId: number) => {
    const newTodos = todos.map(curTodo => (
      curTodo.id === todoId
        ? { ...curTodo, completed: !curTodo.completed }
        : curTodo));

    setTodos(newTodos);
    setChecked(newTodos.every(curTodo => curTodo.completed));
  };

  function deletedTodo(selectedTodo: Todo): void {
    const filteredTodos = todos
      .filter(t => t !== selectedTodo);

    setTodos([...filteredTodos]);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDoubleClick = useCallback((
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsEditing(true);
    setFocus(true);
  }, [isEditing]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleBlur = () => {
    setIsEditing(false);
    setFocus(false);

    if (trimmedTitle === '') {
      deletedTodo(todo);

      return;
    }

    setTodos(todos.map(t => (t.id !== todo.id
      ? t
      : {
        ...todo,
        title: trimmedTitle,
      })));
    setTitle(trimmedTitle);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
      setFocus(false);

      return;
    }

    if (event.key === 'Enter') {
      handleBlur();
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
          onChange={() => handleCheckedTodo(todo.id as number)}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deletedTodo(todo)}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});

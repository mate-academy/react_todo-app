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
  const [editing, setEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const thisTodo = useRef<HTMLInputElement>(null);

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

  const handleDoubleClick = useCallback((
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setEditing(true);
    setFocus(true);
  }, [editing]);

  useEffect(() => {
    if (focus && thisTodo.current) {
      thisTodo.current.focus();
    }
  }, [focus]);

  const handleBlur = () => {
    setEditing(false);
    setFocus(false);

    if (title.trim() === '') {
      deletedTodo(todo);

      return;
    }

    setTodos(todos.map(t => (t !== todo
      ? t
      : {
        ...todo,
        title: title.trim(),
      })));
    setTitle(title.trim());
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setEditing(false);
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
      editing,
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
        ref={thisTodo}
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});

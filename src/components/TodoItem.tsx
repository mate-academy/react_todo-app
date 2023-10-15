/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Todo, todoContext, ContextType } from '../Contexts/Context';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, todos } = useContext(
    todoContext,
  ) as ContextType;
  const [isEditiing, setIsEditiing] = useState(false);
  const [editQuery, setEditQuery] = useState(todo.title);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditiing) {
      editRef.current?.focus();
    }
  }, [isEditiing]);

  const handleColplete = useCallback(
    (state: boolean) => {
      setTodos(
        [
          ...todos.filter((td) => td.id !== todo.id),
          {
            ...todo,
            completed: state,
          },
        ].sort((a, b) => a.id - b.id),
      );
    },
    [setTodos, todo, todos],
  );

  const changeTitle = useCallback(
    (title: string) => {
      setTodos(
        [
          ...todos.filter((td) => td.id !== todo.id),
          {
            ...todo,
            title,
          },
        ].sort((a, b) => a.id - b.id),
      );
    },
    [setTodos, todo, todos],
  );

  const deleteTodo = useCallback(() => {
    setTodos([...todos.filter((td) => td.id !== todo.id)]);
  }, [setTodos, todo.id, todos]);

  const edit = () => {
    if (!editQuery.trim()) {
      deleteTodo();

      return;
    }

    setIsEditiing((prev) => !prev);
    changeTitle(editQuery);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      edit();
    }
  };

  const onEditInit = () => {
    setIsEditiing((prev) => !prev);
    handleColplete(false);
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditiing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={(e) => handleColplete(e.target.checked)}
        />
        <label onDoubleClick={onEditInit}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input
        ref={editRef}
        type="text"
        className="edit"
        value={editQuery}
        onChange={(e) => setEditQuery(e.target.value)}
        onKeyDown={onEnter}
        onBlur={edit}
      />
    </li>
  );
};

export { TodoItem as TodoComponent };

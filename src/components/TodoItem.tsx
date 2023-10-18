import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setToggleAllStatus } = useContext(TodosContext);
  const [editStatus, setEditStatus] = useState(false);
  const [editInput, setEditInput] = useState(todo.title);

  const editFocus = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editFocus.current) {
      editFocus.current.focus();
    }
  }, [editStatus]);

  const handleCompletedTodo = (todoID: number) => {
    const newTodo = todos.map(el => (
      el.id === todoID
        ? { ...el, completed: !el.completed }
        : el
    ));

    setTodos(newTodo);

    setToggleAllStatus(newTodo.every(curTodo => curTodo.completed));
  };

  const handleDeletedTodo = (selected: Todo) => {
    const delTodo = todos.filter(el => el !== selected);

    setTodos([...delTodo]);
  };

  const handleOnBlur = () => {
    setEditStatus(false);

    if (!editInput.trim()) {
      handleDeletedTodo(todo);

      return;
    }

    setTodos(todos.map(el => (
      el !== todo
        ? el
        : { ...todo, title: editInput.trim() }
    )));

    setEditInput(editInput.trim());
  };

  const handleKey = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case ('Escape'):
        setEditInput(todo.title);
        setEditStatus(false);
        break;

      case ('Enter'):
        handleOnBlur();
        break;

      default:
        break;
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editStatus,
      })}
      onDoubleClick={() => setEditStatus(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleCompletedTodo(todo.id)}
        />
        <label
          onDoubleClick={() => setEditStatus(true)}
        >
          {todo.title}
        </label>
        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeletedTodo(todo)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editFocus}
        onKeyUp={handleKey}
        value={editInput}
        onChange={event => setEditInput(event.target.value)}
        onBlur={handleOnBlur}
      />
    </li>
  );
};

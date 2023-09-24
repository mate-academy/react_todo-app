import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';
import { KeyStatus } from '../types/KeyStatus';

type Props = {
  todo: Todo
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setIsToggleAllStatus } = useContext(TodosContext);
  const [editStatus, setEditStatus] = useState(false);
  const [editInputValue, setEditInputValue] = useState(todo.title);
  const editFocus = useRef<HTMLInputElement | null>(null);

  const handleCompleteTodo = (todoId: number) => {
    const newTodos = todos.map(currentTodo => (
      currentTodo.id === todoId
        ? { ...currentTodo, completed: !currentTodo.completed }
        : currentTodo));

    setTodos(newTodos);
    setIsToggleAllStatus(newTodos.every(curTodo => curTodo.completed));
  };

  const handleDeleteTodo = (selectedTodo: Todo):void => {
    const filteredTodos = todos.filter(t => t !== selectedTodo);

    setTodos([...filteredTodos]);
  };

  useEffect(() => {
    if (!editStatus && editFocus.current) {
      editFocus.current.focus();
    }
  }, [editStatus]);

  const handleLableDoubleClick = () => {
    setEditStatus(true);
  };

  const handleBlur = () => {
    setEditStatus(false);

    if (!editInputValue.trim()) {
      handleDeleteTodo(todo);

      return;
    }

    setTodos(todos.map(t => (t !== todo
      ? t
      : {
        ...todo,
        title: editInputValue.trim(),
      })));
    setEditInputValue(editInputValue.trim());
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case KeyStatus.Esc:
        setEditInputValue(todo.title);
        setEditStatus(false);
        break;
      case KeyStatus.Enter:
        handleBlur();
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
          onChange={() => handleCompleteTodo(todo.id)}
        />
        <label onDoubleClick={handleLableDoubleClick}>{todo.title}</label>
        <button
          aria-label="deleteTodo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo)}
        />
      </div>
      <input
        type="text"
        ref={editFocus}
        className="edit"
        value={editInputValue}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onChange={(event) => setEditInputValue(event.target.value)}
      />
    </li>
  );
};

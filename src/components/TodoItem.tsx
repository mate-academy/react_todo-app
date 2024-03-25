import classNames from 'classnames';
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DispatchContext, StateContext } from '../lib/TodosContext';
import { Todo } from '../type/Todo';

type Props = {
  todo: Todo;
};

const isTitleEmpty = (title: string) => title.trim() === '';

export const TodoItem: FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const memoizedDispatch = useMemo(() => dispatch, [dispatch]);
  const memoizedTodos = useMemo(() => todos, [todos]);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const editInput = useRef<HTMLInputElement | null>(null);

  const handleDeleteTodo = useCallback(
    (itemId: number) => {
      const newTodos = todos.filter(currentTodo => currentTodo.id !== itemId);

      dispatch({
        type: 'setTodos',
        payload: newTodos,
      });
    },
    [dispatch, todos],
  );

  const handleDoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      const newTodos = memoizedTodos.map(item => {
        return item.id === todo.id ? { ...item, completed: checked } : item;
      });

      memoizedDispatch({
        type: 'setTodos',
        payload: newTodos,
      });
    },
    [memoizedDispatch, memoizedTodos, todo.id],
  );

  const handleDeleteClick = useCallback(() => {
    handleDeleteTodo(todo.id);
  }, [handleDeleteTodo, todo.id]);

  const handleEditChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
    },
    [],
  );

  const handleEditKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (isTitleEmpty(editValue)) {
          handleDeleteClick();
        } else {
          const newTodos = memoizedTodos.map(item => {
            return item.id === todo.id ? { ...item, title: editValue } : item;
          });

          memoizedDispatch({
            type: 'setTodos',
            payload: newTodos,
          });

          setIsEdit(false);
        }
      } else if (event.key === 'Escape') {
        if (isTitleEmpty(editValue)) {
          handleDeleteClick();
        } else {
          setEditValue(todo.title);
          setIsEdit(false);
        }
      }
    },
    [
      editValue,
      handleDeleteClick,
      memoizedDispatch,
      memoizedTodos,
      todo.id,
      todo.title,
      setIsEdit,
    ],
  );

  const handleEditBlur = useCallback(() => {
    if (isTitleEmpty(editValue)) {
      handleDeleteClick();
    } else {
      const newTodos = memoizedTodos.map(item => {
        return item.id === todo.id ? { ...item, title: editValue } : item;
      });

      memoizedDispatch({
        type: 'setTodos',
        payload: newTodos,
      });

      setIsEdit(false);
    }
  }, [
    editValue,
    handleDeleteClick,
    memoizedDispatch,
    memoizedTodos,
    todo.id,
    setIsEdit,
  ]);

  useEffect(() => {
    if (isEdit && editInput.current) {
      editInput.current.focus();
    }
  }, [isEdit]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleDoneChange}
        />

        <label onDoubleClick={() => setIsEdit(true)}>{todo.title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>
      <input
        ref={editInput}
        type="text"
        className="edit"
        value={editValue}
        onChange={handleEditChange}
        onBlur={handleEditBlur}
        onKeyDown={handleEditKeyDown}
      />
    </li>
  );
};

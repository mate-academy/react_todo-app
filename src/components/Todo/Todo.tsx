import React, { useCallback, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import classNames from 'classnames';
import { useTodos } from '../../context/TodosContext';
import { focusInput } from '../../utils/focusInput';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { inputFocus, setTodos } = useTodos();
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
  const [newValue, setNewValue] = useState('');

  const deleteTodo = useCallback(
    (id: number | undefined) => {
      if (id) {
        setTodos(current => current.filter(oneTodo => oneTodo.id !== id));
        focusInput(inputFocus);
      }
    },
    [setTodos, inputFocus],
  );

  const editTodoTitle = useCallback(
    () =>
      setTodos(current =>
        current.map(oneTodo =>
          oneTodo.id === editingTodo?.id
            ? { ...oneTodo, title: newValue.trim() }
            : oneTodo,
        ),
      ),
    [editingTodo, setTodos, newValue],
  );

  const editTodoCompleted = useCallback(
    (id: number, value: boolean) => {
      setTodos(current =>
        current.map(oneTodo =>
          oneTodo.id === id ? { ...oneTodo, completed: !value } : oneTodo,
        ),
      );
      focusInput(inputFocus);
    },
    [setTodos, inputFocus],
  );

  const editTodos = useCallback(() => {
    if (newValue.trim() !== '') {
      editTodoTitle();
      setEditingTodo(null);
      setNewValue('');
      focusInput(inputFocus);
    } else {
      deleteTodo(editingTodo?.id);
      setEditingTodo(null);
      setNewValue('');
      focusInput(inputFocus);
    }
  }, [editingTodo, newValue, deleteTodo, editTodoTitle, inputFocus]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          aria-label="checked"
          checked={todo.completed}
          onClick={() => editTodoCompleted(todo.id, todo.completed)}
        />
      </label>
      {todo.id !== editingTodo?.id ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setNewValue(todo.title);
              setEditingTodo(todo);
            }}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={() => editTodos()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            defaultValue={todo.title}
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            onBlur={() => editTodos()}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                setEditingTodo(null);
                setNewValue('');
              }
            }}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

import React, { RefObject, useCallback, useState } from 'react';
import './Todo.scss';
import { ActionInTodoContextReducer, TodoInterface } from '../../utils';

interface Props {
  readonly todos: TodoInterface[];
  updateTodo: React.Dispatch<ActionInTodoContextReducer>;
  mainInput: RefObject<HTMLInputElement>;
}

export const Todo = React.memo<Props>(({ todos, updateTodo, mainInput }) => {
  const [todoClickToEdit, setTodoClickToEdit] = useState(0);
  const [valueInInputForEditTodo, setValueInInputForEditTodo] = useState('');

  const saveData = (idx: number) => {
    return () => {
      setTodoClickToEdit(0);
      if (valueInInputForEditTodo === '') {
        updateTodo({ type: 'DELETE', payload: { idx: idx } });
      } else {
        updateTodo({
          type: 'UPDATETITLE',
          payload: { idx: idx, content: valueInInputForEditTodo },
        });
      }
    };
  };

  const handleClickToEdit = (idx: number) => {
    return () => {
      setTodoClickToEdit(todos[idx].id);
      setValueInInputForEditTodo(todos[idx].title);
    };
  };

  const handleOnSubmitEditFormTodo = useCallback((idx: number) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mainInput.current!.focus();
      setValueInInputForEditTodo('');
      saveData(idx);
    };
  }, []);

  const handleClickCompletedTodo = useCallback((idx: number) => {
    return () => updateTodo({ type: 'UPDATESTATUS', payload: { idx: idx } });
  }, []);

  const handleOnDeleteButton = useCallback((idx: number) => {
    return () => updateTodo({ type: 'DELETE', payload: { idx: idx } });
  }, []);

  const handleEscapeKeyInFormEditTodo = (idx: number) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      setValueInInputForEditTodo(todos[idx].title);
      if (event.key === 'Escape') {
        updateTodo({ type: 'DEFAULT' });
      }
    };
  };

  const handleOnChangeFormTodo = useCallback(() => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueInInputForEditTodo(event.target.value);
    };
  }, []);

  return (
    <>
      {todos.map(({ id, title, completed }, idx) => {
        return (
          <div
            data-cy="Todo"
            className={`todo ${completed ? 'completed' : ''}`}
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onChange={handleClickCompletedTodo(idx)}
                checked={completed}
              />
            </label>

            {todoClickToEdit === id ? (
              <form onSubmit={handleOnSubmitEditFormTodo(idx)}>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  autoFocus={true}
                  onChange={handleOnChangeFormTodo()}
                  onBlur={saveData(idx)}
                  onKeyDown={handleEscapeKeyInFormEditTodo(idx)}
                  value={valueInInputForEditTodo}
                />
              </form>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={handleClickToEdit(idx)}
                >
                  {title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={handleOnDeleteButton(idx)}
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
});

Todo.displayName = 'Todo';

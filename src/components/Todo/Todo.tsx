import React, {
  RefObject,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import './Todo.scss';
import { ActionInTodoContextReducer, TodoInterface } from '../../utils';

interface Props {
  readonly todos: TodoInterface[];
  updateTodo: React.Dispatch<ActionInTodoContextReducer>;
  mainInput: RefObject<HTMLInputElement>;
}

export const Todo = React.memo<Props>(({ todos, updateTodo, mainInput }) => {
  const allData = useMemo(
    () =>
      todos.map(e => {
        return { ...e };
      }),
    [todos],
  );
  const [listClickedsOrNot, setListClickedsOrNot] = useState(
    allData.map(() => false),
  );
  const [, forceRender] = useState({});

  useEffect(() => {
    setListClickedsOrNot(allData.map(() => false));
  }, [allData]);

  const handleClickedOrNot = (idx: number) => {
    return () => {
      const newList = [...listClickedsOrNot];

      mainInput.current!.focus();
      newList[idx] = !newList[idx];
      setListClickedsOrNot(newList);
    };
  };

  const handleOnSubmitEditFormTodo = (idx: number) => {
    handleClickedOrNot(idx);

    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mainInput.current!.focus();
    };
  };

  const handleClickCompletedTodo = useCallback((idx: number) => {
    return () => updateTodo({ type: 'UPDATESTATUS', payload: { idx: idx } });
  }, []);

  const handleOnDeleteButton = useCallback((idx: number) => {
    return () => updateTodo({ type: 'DELETE', payload: { idx: idx } });
  }, []);

  const handleOnBlurFormEditTodo = (idx: number) => {
    return () => {
      if (allData[idx].title === '') {
        updateTodo({ type: 'DELETE', payload: { idx: idx } });
      } else {
        updateTodo({
          type: 'UPDATETITLE',
          payload: { idx: idx, content: allData[idx].title },
        });
      }
    };
  };

  const handleEscapeKeyInFormEditTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      updateTodo({ type: 'DEFAULT' });
    }
  };

  const handleOnChangeFormTodo = (idx: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      allData[idx].title = event?.currentTarget.value;
      forceRender({}); // Evita colocar
    };
  };

  return (
    <>
      {allData.map(({ id, title, completed }, idx) => {
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

            {listClickedsOrNot[idx] ? (
              <form onSubmit={handleOnSubmitEditFormTodo(idx)}>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  autoFocus={true}
                  onChange={handleOnChangeFormTodo(idx)}
                  onBlur={handleOnBlurFormEditTodo(idx)}
                  onKeyDown={handleEscapeKeyInFormEditTodo}
                  value={allData[idx].title}
                />
              </form>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={handleClickedOrNot(idx)}
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

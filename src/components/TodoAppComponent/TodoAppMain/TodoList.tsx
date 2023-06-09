import cn from 'classnames';
import {
  FormEvent, KeyboardEvent, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../../types/Todo';
import { useTodosContext } from '../../../Context/TodosContext';

interface PropsTodoList {
  filteredTodos: Todo[];
}
export const TodoList = ({ filteredTodos }: PropsTodoList) => {
  const [isEditById, setIsEditById] = useState(0);
  const [tempTitle, setTempTitle] = useState('');
  const todoInputRef = useRef<HTMLInputElement>(null);

  const {
    tempTodo, loading, setLoading, handleDeleteTodo,
    handleClickCheck, editTitle,
  } = useTodosContext();

  const handleDoubleClickEdit = (todo: Todo) => {
    const { id, title } = todo;

    setIsEditById(id);
    setTempTitle(title);
  };

  useEffect(() => {
    if (todoInputRef.current) {
      if (isEditById) {
        todoInputRef.current.focus();
      } else {
        todoInputRef.current.blur();
      }
    }
  }, [isEditById]);

  const handleEditTitle = (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    editTitle(isEditById, tempTitle);
    setIsEditById(0);
    setTempTitle('');
    setLoading(false);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditById(0);
    }
  };

  return (
    <section className="todoapp__main">
      {filteredTodos.length > 0 && filteredTodos.map(todo => {
        const { id, completed, title } = todo;

        return (
          <div
            className={cn({
              todo: !completed,
              'todo completed': completed,
            })}
            key={id}
          >
            <label
              className="todo__status-label"
            >
              <input
                type="checkbox"
                className="todo__status"
                checked={completed}
                onClick={() => handleClickCheck(todo)}
              />
            </label>

            {isEditById !== id ? (
              <>
                <span
                  onDoubleClick={() => handleDoubleClickEdit(todo)}
                  className="todo__title"
                >
                  {title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  ×

                </button>

              </>
            )
              : (
                <form
                  onSubmit={handleEditTitle}

                >
                  <input
                    type="text"
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={tempTitle}
                    onChange={(event) => setTempTitle(event.target.value)}
                    onKeyUp={handleKeyUp}
                    onBlur={handleEditTitle}
                    ref={todoInputRef}
                  />
                </form>
              )}

            <div className={cn({
              'modal overlay': !loading,
              'modal overlay is-active': loading,
            })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
      {tempTodo && (
        <div className="todo">
          <label
            className="todo__status-label"
          >
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>
          <span className="todo__title">{tempTodo.title}</span>
        </div>
      )}
    </section>
  );
};

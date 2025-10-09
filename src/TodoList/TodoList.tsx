import React, {
  useContext,
  useEffect,
  RefObject,
  useState,
  useRef,
} from 'react';
import { todoContext } from '../Context/Context';
import classNames from 'classnames';
import { Todo } from '../Utils/types';

type Props = {
  inputRef: RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({ inputRef }) => {
  const { state, dispatch } = useContext(todoContext);
  const [title, setTitle] = useState('');
  const [editedId, setEditedId] = useState<null | number>(null);
  const editedRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos') ?? '[]');

    const deleted = todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(deleted));

    dispatch({ type: 'REMOVE_TODO', payload: id });

    inputRef.current?.focus();
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

    if (!savedTodos) {
      localStorage.setItem('todos', JSON.stringify([]));
    }

    dispatch({ type: 'SET_TODOS', payload: todos });
  }, [dispatch]);

  const handleSubmit = (id: number, e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (title.trim().length === 0) {
      handleDelete(id);

      return;
    }

    const updatedTodos = state.allTodos.map(todo =>
      todo.id === id ? { ...todo, title: title.trim() } : todo,
    );


    localStorage.setItem('todos', JSON.stringify(updatedTodos));


    dispatch({ type: 'SET_TODOS', payload: updatedTodos });

    setTitle('');
    setEditedId(null);
  };

  useEffect(() => {
    if (editedRef.current) {
      setTimeout(() => {
        editedRef.current?.focus();
      }, 0);
    }
  }, [editedId]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditedId(null);
      }
    };


    window.addEventListener('keydown', handleEscape);


    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleChangeTitle = (todo: Todo) => {
    setEditedId(todo.id);
    setTitle(todo.title);
  };

  const handleChangeStatusTodo = (id?: number) => {
    const updatedTodos = state.allTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    dispatch({ type: 'CHANGE_STATUS', payload: id });

    inputRef.current?.focus();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames({
            'todo completed': todo.completed,
            'todo item-enter-done': !todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
              onClick={() => handleChangeStatusTodo(todo.id)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          </label>

          {editedId === todo.id ? (
            <form onSubmit={e => handleSubmit(todo.id, e)}>
              <input
                ref={editedRef}
                type="text"
                data-cy="TodoTitleField"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={() => handleSubmit(todo.id)}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleChangeTitle(todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>
            </>
          )}

          {/* Remove button appears only on hover */}
        </div>
      ))}
    </section>
  );
};



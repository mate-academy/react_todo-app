import { useContext, useEffect, useRef, useState } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../context/GlobalContext/GlobalContext';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../TodosFIlter/TodoFilter';

export const TodoList: React.FC = () => {
  const [pickedTodo, setPickedTodo] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const renameFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    if (renameFocus.current && pickedTodo !== null) {
      renameFocus.current.focus();
    }
  }, [todos, pickedTodo]);

  useEffect(() => {
    const filteredTask = todos.filter(todo => {
      switch (filter) {
        case Filter.all:
          return todo;
        case Filter.active:
          return !todo.completed;
        case Filter.completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    setFilteredTodos(filteredTask);
  }, [filter, todos]);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setPickedTodo(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleDeleteTodo = (todo: Todo) => {
    dispatch({ type: 'deleteTodo', payload: todo });
  };

  const handleCheckTodo = (todo: Todo) => {
    dispatch({ type: 'checkTodo', payload: todo });
  };

  const handleEditTodo = (todo: Todo) => {
    setPickedTodo(todo.id);
    setEditedTitle(todo.title);
  };

  const onSubmit = (id: number) => {
    const changedFilter = todos.find(todo => todo.id === id) as Todo;

    const newTodo = {
      ...changedFilter,
      updatedAt: new Date(),
      title: editedTitle.trim(),
    };

    if (!editedTitle.trim()) {
      dispatch({ type: 'deleteTodo', payload: newTodo });
    } else {
      dispatch({ type: 'changeTodo', payload: newTodo });
    }

    setPickedTodo(null);
    setEditedTitle('');
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
          onDoubleClick={() => handleEditTodo(todo)}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onClick={() => handleCheckTodo(todo)}
            />
          </label>

          {todo.id === pickedTodo ? (
            <form onSubmit={() => onSubmit(todo.id)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
                onBlur={() => onSubmit(todo.id)}
                ref={renameFocus}
              />
            </form>
          ) : (
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

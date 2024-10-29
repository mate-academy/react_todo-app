/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { DispatchContext, StateContext } from '../../Store';
import { Status } from '../../types/Status';
import { ErrorMessage } from '../../types/ErrorMessage';
import { onAutoCloseNotification } from '../../utils/autoCloseNotification';
import { deleteTodo, editTodo, toggleTodo } from '../../api/todos';

export const TodoList: React.FC = () => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isFailed, setIsFailed] = useState(false);
  const { todos, status, tempTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleStartEdit = (prevTitle: string, id: number) => {
    if (isFailed) {
      return;
    }

    setIsEditing(id);
    setNewTodoTitle(prevTitle);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(null);
      setNewTodoTitle('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: 'startAction', selectedTodo: [id] });

    deleteTodo(id)
      .then(() => {
        dispatch({ type: 'deletingSuccesses' });
      })
      .catch(() => {
        dispatch({ type: 'failure', errorMessage: ErrorMessage.delete });
        onAutoCloseNotification(dispatch);
      })
      .finally(() => {
        dispatch({ type: 'reset' });
      });
  };

  const handleToggleTodo = async (todo: Todo, index: number) => {
    const { completed, id } = todo;

    try {
      dispatch({ type: 'startAction', selectedTodo: [id] });
      const updatedTodo = await toggleTodo(id, completed);

      dispatch({
        type: 'editTodoSuccess',
        index,
        updatedTodo: updatedTodo as Todo,
      });
    } catch {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.update });
    } finally {
      dispatch({ type: 'reset' });
      onAutoCloseNotification(dispatch);
    }
  };

  const handleEditTitle = async (
    event: React.FormEvent,
    todo: Todo,
    index: number,
  ) => {
    event.preventDefault();

    const { title, id } = todo;

    if (title === newTodoTitle) {
      setIsEditing(null);
      setNewTodoTitle('');

      return;
    }

    if (!newTodoTitle.trim()) {
      handleDeleteTodo(id);

      return;
    }

    try {
      dispatch({ type: 'startAction', selectedTodo: [id] });

      const updatedTodo = await editTodo(id, newTodoTitle.trim());

      dispatch({
        type: 'editTodoSuccess',
        index,
        updatedTodo: updatedTodo as Todo,
      });

      setNewTodoTitle('');
      setIsEditing(null);
      setIsFailed(false);
    } catch {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.update });
      setIsFailed(true);
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  const visibleTodos = useMemo(() => {
    switch (status) {
      case Status.all:
        return todos;
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [status, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={i}
          isEditing={isEditing}
          newTitle={newTodoTitle}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onStartEditing={handleStartEdit}
          onNewTodoTitle={setNewTodoTitle}
          onChangeTodoTitle={handleEditTitle}
          onKey={handleKey}
        />
      ))}

      {tempTodo && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};

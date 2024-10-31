/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { DispatchContext, StateContext } from '../../Store';
import { Status } from '../../types/Status';
import { ErrorMessage } from '../../types/ErrorMessage';
import { onAutoCloseNotification } from '../../utils/autoCloseNotification';

export const TodoList: React.FC = () => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isFailed, setIsFailed] = useState(false);
  const { todos, status } = useContext(StateContext);
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

    try {
      dispatch({ type: 'deletingSuccesses' });
    } catch (error) {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.delete });
      onAutoCloseNotification(dispatch);
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  const handleToggleTodo = (todo: Todo, index: number) => {
    const { completed, id } = todo;

    try {
      dispatch({ type: 'startAction', selectedTodo: [id] });
      const updatedTodo = { ...todo, completed: !completed };

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

  const handleEditTitle = (
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
      const updatedTodo = { ...todo, title: newTodoTitle.trim() };

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
    </section>
  );
};

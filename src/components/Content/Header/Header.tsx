import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from 'react';
import classNames from 'classnames';
import { createTodo } from '../../../api/todos';
import { getFilteredTodos } from '../../../utils/filterTodos';
import { AuthContext } from '../../Auth/AuthContext';
import { Todo } from '../../../types/Todo';
import { Error } from '../../../types/Error';
import { TodoStatus } from '../../../types/TodoStatus';

type Props = {
  todos: Todo[];
  isAdding: boolean;
  onAdding: (status: boolean) => void;
  onAddTodo: (newTodo: Todo) => void;
  onUpdateTodo: (todoId: number, data: {}) => void;
  onSetTempTodo: (userId?: number, title?: string) => void;
  onError: (error: Error | null) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  isAdding,
  onAdding,
  onAddTodo,
  onUpdateTodo,
  onSetTempTodo,
  onError,
}) => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = async (newTitle: string) => {
    onAdding(true);
    onError(null);

    try {
      if (!newTitle.trim()) {
        onError(Error.TITLE);
        onAdding(false);

        return;
      }

      if (user) {
        onSetTempTodo(user.id, newTitle);

        const newTodo = await createTodo({
          userId: user.id,
          title: newTitle,
          completed: false,
        });

        onAddTodo(newTodo);
      }
    } catch {
      onError(Error.ADD_TODO);
    } finally {
      onAdding(false);
      onSetTempTodo();
    }
  };

  const completedTodos = getFilteredTodos(todos, TodoStatus.COMPLETED);
  const allCompleted = (todos.length === completedTodos.length);

  const handleToggleAllButton = () => {
    const isToggled = todos.some(todo => todo.completed === false);

    const toggleStatus = (status: boolean) => {
      todos.forEach(todo => onUpdateTodo(
        todo.id, { completed: status },
      ));
    };

    return isToggled
      ? toggleStatus(true)
      : toggleStatus(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    handleAddTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: allCompleted },
          )}
          aria-label="ToggleAll"
          onClick={() => handleToggleAllButton()}
        />
      )}

      <form
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          data-cy="createTodo"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          disabled={isAdding}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};

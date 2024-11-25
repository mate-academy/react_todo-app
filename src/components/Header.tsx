import classNames from 'classnames';
import { useTodoContext } from './TodoContext';
import { createTodo, updateTodo } from '../api/todos';
import { Todo } from '../types/Todo';
import { focusInput } from '../utils/services';
import { USER_ID } from '../utils/constants';

type Props = {};

export const Header: React.FC<Props> = () => {
  const {
    todoTitle,
    setTodoTitle,
    todos,
    setTodos,
    showError,
    setActiveTodoList,
    setError,
    inputRef,
    isSubmitting,
    setIsSubmitting,
    setActiveTodoId,
    setTempTodo,
  } = useTodoContext();

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleToggleAll = async () => {
    let toggledList = todos.filter(todo => !todo.completed);

    if (isAllCompleted) {
      toggledList = [...todos];
    }

    const shouldCompleteAll = !isAllCompleted;
    const activeTodoIds = toggledList.map(todo => todo.id);

    setActiveTodoList(activeTodoIds);

    await Promise.allSettled(
      toggledList.map(async todo => {
        const updatedTodo = {
          ...todo,
          completed: shouldCompleteAll,
        };
        const { id, title, completed, userId } = updatedTodo;

        try {
          const updated = await updateTodo({ id, title, completed, userId });

          setTodos(currentTodos =>
            currentTodos.map(t => (t.id === updated.id ? updated : t)),
          );
        } catch {
          showError(`Unable to update todo with ID ${todo.id}`);
        }
      }),
    );

    setActiveTodoList([]);
  };

  const resetForm = () => {
    setTodoTitle('');
    setTempTodo(null);
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = todoTitle.trim();

    setError('');
    setTodoTitle(trimmedTitle);

    if (!trimmedTitle) {
      showError('Title should not be empty');
      focusInput(inputRef);

      return;
    }

    const newTempTodo: Todo = {
      id: 0,
      title: trimmedTitle,
      userId: USER_ID,
      completed: false,
    };

    setTempTodo(newTempTodo);
    setIsSubmitting(true);
    setActiveTodoId(newTempTodo.id);

    try {
      const newTodo = await createTodo({
        title: trimmedTitle,
        userId: USER_ID,
        completed: false,
      });

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetForm();
    } catch (err) {
      showError('Unable to add a todo');
      throw err;
    } finally {
      setIsSubmitting(false);
      setTempTodo(null);
      setActiveTodoId(null);
      focusInput(inputRef);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setError('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          onClick={handleToggleAll}
          data-cy="ToggleAllButton"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
        />
      )}

      <form
        action="api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTitleChange}
          ref={inputRef}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};

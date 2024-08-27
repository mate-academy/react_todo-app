import { useDispatch } from '../CustomHooks/useDispatch';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { deleteTodoFromStorage } from '../api/todos';

export const FooterButton = () => {
  const { todos, inputHeaderRef } = useGlobalState();
  const dispatch = useDispatch();

  const hasCompletedTodos = todos.some(todo => todo.completed);

  const clearCompleted = async () => {
    const completedTodos = todos.filter(todo => todo.completed);

    const deletePromises = completedTodos.map(
      todo =>
        new Promise<void>(resolve => {
          deleteTodoFromStorage(todo.id);
          dispatch({ type: 'deleteTodo', payload: todo.id });
          resolve();
        }),
    );

    if (inputHeaderRef?.current) {
      inputHeaderRef.current.focus();
    }

    await Promise.allSettled(deletePromises);
  };

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompletedTodos}
      onClick={clearCompleted}
    >
      Clear completed
    </button>
  );
};

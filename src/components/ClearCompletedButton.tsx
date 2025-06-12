import { useContext } from 'react';
import { deleteTodo } from '../api/localStorageFunctions';
import { TodosContext } from '../context/TodosContext';
import { FocusContext } from '../context/FocusContext';

export const ClearCompletedButton = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { focusInput } = useContext(FocusContext);
  const clearHandler = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const activeTodos = todos.filter(todo => !todo.completed);

    completedTodos.map(todo => deleteTodo(todo.id));
    setTodos(activeTodos);
    focusInput();
  };

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={todos.every(todo => !todo.completed) ? true : false}
      onClick={clearHandler}
    >
      Clear completed
    </button>
  );
};

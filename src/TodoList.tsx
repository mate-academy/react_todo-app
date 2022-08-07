import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { Todo } from './type';
import { TodoItem } from './TodoItem';
import { COUNT_OF_ACTIVE, TOGGLE_ALL } from './store/todosReducer';

export const TodoList = () => {
  const visibleTodos = useSelector(
    (state: RootState) => state.todos.visibleTodos,
  );
  const dispatch = useDispatch();
  const countOfActiveTodos = useSelector(
    (state: RootState) => state.todos.countOfActiveTodos,
  );

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={countOfActiveTodos !== 0}
        onChange={() => {
          dispatch({ type: TOGGLE_ALL });
          dispatch({ type: COUNT_OF_ACTIVE });
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list" data-cy="todoList">
        {visibleTodos.map((todo: Todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </>
  );
};

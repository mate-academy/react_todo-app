/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useDispatch, useGlobalState } from '../context/Context';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList/TodoList';
import { TodoFilter } from './TodoFilter/TodoFilter';

export const Main = () => {
  const { todos } = useGlobalState();
  const dispatch = useDispatch();
  const isAllCompleted = todos.some(todo => !todo.completed);

  // eslint-disable-next-line no-console
  console.log('render Main');

  return (
    <>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', !isAllCompleted && 'active')}
              data-cy="ToggleAllButton"
              onClick={() => dispatch({ type: 'toggleAll' })}
            />
          )}

          <NewTodo />
        </header>

        <TodoList />
        {todos.length > 0 && <TodoFilter />}
      </div>
    </>
  );
};

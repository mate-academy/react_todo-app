import { useSearchParams } from 'react-router-dom';

import { Action } from './lib/enums/Action';
import { Status } from './lib/enums/Status';
import { ITodo } from './lib/types/ITodo';
import { useTodoContext } from './lib/shared/TodoContext';

import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import './TodoApp.scss';

function getVisibleTodos(todos: ITodo[], todoStatus: Status) {
  switch (todoStatus) {
    case Status.COMPLETED:
      return todos.filter((todo) => todo.completed);

    case Status.UNCOMPLETED:
      return todos.filter((todo) => !todo.completed);

    default:
      return todos;
  }
}

const TodoApp = () => {
  const [searchParams] = useSearchParams();
  const { todos, dispatchTodos } = useTodoContext();
  const todoStatus = searchParams.get('status') || Status.ALL;

  const visibleTodos: ITodo[] = getVisibleTodos(todos, todoStatus as Status);
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="TodoApp">
      <article className="TodoApp__todo-app">
        <TodoAdd className="TodoApp__todo-add" />

        <div className="TodoApp__upper-actions">
          <div className="TodoApp__upper-actions-wrapper">
            <button
              type="button"
              className="TodoApp__upper-action TodoApp__upper-action--complete"
              onClick={() => dispatchTodos({ type: Action.COMPLETE_ALL_TODOS })}
            >
              Complete all tasks
            </button>

            <button
              type="button"
              className="TodoApp__upper-action TodoApp__upper-action--clear"
              onClick={() => dispatchTodos({ type: Action.CLEAR_COMPLETED_TODOS })}
            >
              Clear completed
            </button>
          </div>
        </div>

        {visibleTodos.length > 0 && <TodoList todos={visibleTodos} />}

        <div className="TodoApp__lower-actions">
          <p className="TodoApp__todos-left">
            <span className="TodoApp__todos-count">{activeTodosCount}</span>
            tasks left
          </p>

          <TodoFilter />
        </div>
      </article>
    </div>
  );
};

export { TodoApp };

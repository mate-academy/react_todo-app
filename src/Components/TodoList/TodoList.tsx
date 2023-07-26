import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { TodoItem } from '../TodoItem';
import { Status, Todo } from '../../types';

export const TodoList: React.FC = () => {
  const { todoList, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  let filteredTodoList: Todo[];

  switch (filter) {
    case Status.active:
      filteredTodoList = todoList.filter(todo => todo.completed === false);
      break;

    case Status.completed:
      filteredTodoList = todoList.filter(todo => todo.completed === true);
      break;

    case Status.all:
      filteredTodoList = [...todoList];
      break;

    default:
      filteredTodoList = [...todoList];
  }

  const completedAll = todoList.every(item => item.completed);

  return (
    <section className="main">
      {filteredTodoList.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={completedAll}
            onChange={() => dispatch({ type: 'isCompleteAll' })}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        {filteredTodoList.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};

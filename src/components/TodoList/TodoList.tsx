import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { todosStatus } = useContext(TodosContext);

  let filteredTodos = [...todos];

  switch (todosStatus) {
    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = todos.filter(todo => todo);
  }

  return (
    <ul className="todo-list" data-cy="todoList">

      {filteredTodos.map(todo => {
        const id = todo.id.toString();

        return (
          <TodoItem
            todo={todo}
            id={id}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
};

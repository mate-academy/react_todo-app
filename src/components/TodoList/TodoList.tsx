import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  // filteredTodos: Todo[],
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { filterCallback } = useContext(TodosContext);

  const filteredTodos = todos.filter((todo) => filterCallback(todo));

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

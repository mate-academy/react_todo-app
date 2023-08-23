import { useContext, useMemo, FC } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../enums/Status';

export const TodoList: FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map((item: Todo) => (
        <TodoItem
          item={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};

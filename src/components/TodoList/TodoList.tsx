import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../types/Status';
import { useGlobalState } from '../../GlobalStateProvider';

export const TodoList: React.FC = () => {
  const { todos, status } = useGlobalState();

  const getList = (sortType: Status): Todo[] => {
    switch (sortType) {
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
        return todos.filter(todo => todo.completed);
      case Status.all:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {getList(status).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

import TodoItem from './TodoItem';
import { Todo } from '../type/Todo';

type Props = {
  items: Todo[] | [];
};

const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => <TodoItem item={item} key={item.id} />)}
    </ul>
  );
};

export default TodoList;

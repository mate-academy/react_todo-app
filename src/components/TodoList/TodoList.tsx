/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo [],
  deleteTodo: (n: number) => void
  markAsCompleted: (n: number) => void
  setNewTitle: (title: string, n: number) => void
};

export const TodoList: React.FC<Props> = ({
  items, deleteTodo, markAsCompleted, setNewTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map((item: Todo) => (
        <TodoItem
          key={item.id}
          item={item}
          deleteTodo={deleteTodo}
          markAsCompleted={markAsCompleted}
          setNewTitle={setNewTitle}
        />
      ))}
    </ul>
  );
};

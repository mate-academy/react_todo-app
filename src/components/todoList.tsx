import { useContext } from 'react';
import { TodoItem } from './todoItem';
import { TodosContext } from './todosContext';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  const { todos } = useContext(TodosContext);

  const isListShown = () => {
    return todos.length > 0;
  };

  return (
    isListShown() === true && (
      <ul className="todo-list" data-cy="todosList">
        {items.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    )
  );
};

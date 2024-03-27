import { useContext } from 'react';
import { Todo } from '../type/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
enum Status {
  all = '#/',
  active = '#/active',
  completed = '#/completed',
}

type Props = {
  items: Todo[];
  filterBy: string;
};
export const TodoList: React.FC<Props> = ({ items, filterBy }) => {
  const { makeToggleAll } = useContext(TodosContext);
  const allCompleted = items.every(item => item.completed);

  const handleToggleAll = () => {
    makeToggleAll(!allCompleted);
  };

  const filterTodos = items.filter(item => {
    switch (filterBy) {
      case Status.all: {
        return item;
      }

      case Status.active: {
        return !item.completed;
      }

      case Status.completed: {
        return item.completed;
      }

      default:
        return item;
    }
  });

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list" data-cy="todosList">
        {filterTodos.map(todo => (
          <TodoItem item={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
};

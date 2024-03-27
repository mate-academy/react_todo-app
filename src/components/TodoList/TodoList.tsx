import { useContext } from 'react';
import { Todo } from '../../interfaces/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { StateContext } from '../../context/TodosContext';
import { Status } from '../../units/units';

type Props = {
  items: Todo[] | null;
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { filter } = useContext(StateContext);
  const sortedTodos = (todos: Todo[] | null) => {
    let visibleTodos = todos && [...todos];

    if (visibleTodos && filter === Status.Active && visibleTodos) {
      visibleTodos = visibleTodos?.filter(el => !el.completed);
    }

    if (visibleTodos && filter === Status.Completed) {
      visibleTodos = visibleTodos?.filter(el => el.completed);
    }

    return visibleTodos;
  };

  const visibleTodos = sortedTodos(items);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos &&
        visibleTodos.map(item => {
          return <TodoItem key={item.id} item={item} />;
        })}
    </ul>
  );
};

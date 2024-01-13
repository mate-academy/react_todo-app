import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../state/State';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

const getFilteredState = (previousTodos: Todo[], sortBy: Filter): Todo[] => {
  switch (sortBy) {
    case 'active':
      return previousTodos.filter(todo => todo.completed === false);

    case 'completed':
      return previousTodos.filter(todo => todo.completed === true);

    default:
      return previousTodos;
  }
};

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(TodosContext);

  const filteredTodos = getFilteredState(todos, filterBy);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

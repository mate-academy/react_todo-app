import { useContext } from 'react';
import { TodosContext } from '../../state/State';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import './TodoList.scss';
import { TodoItem } from '../TodoItem/TodoItem';

const getFilteredState = (previousTodos: Todo[], sortBy: Filter): Todo[] => {
  switch (sortBy) {
    case Filter.active:
      return previousTodos.filter(todo => !todo.completed);

    case Filter.completed:
      return previousTodos.filter(todo => todo.completed);

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

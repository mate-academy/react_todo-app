import './TodoList.scss';
import { TodoItem } from './TodoItem';
import { TodoFilter } from '../../types/todo filter';
import { useContext } from 'react';
import { TodosContext } from '../../services/TodosContext&Provider';

export const TodoList: React.FC = () => {
  const { todos, selectedFilter } = useContext(TodosContext);

  function getVisibleTodos(filter: TodoFilter) {
    switch (filter) {
      case TodoFilter.Active:
        return todos.filter(todo => !todo.completed);
      case TodoFilter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  const visibleTodos = getVisibleTodos(selectedFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

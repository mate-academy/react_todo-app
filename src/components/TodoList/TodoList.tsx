/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFilter } from '../../hooks/useFilter';
import { useTodos } from '../../hooks/useTodos';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { Todo as TodoItem } from '../Todo/';
import './TodoList.scss';

const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  return todos.filter(todo => {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
    }
  });
};

export const TodoList = () => {
  const todos = useTodos();
  const filter = useFilter();

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todo-list" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </section>
  );
};

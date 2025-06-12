import { useContext } from 'react';
import { ActiveLink } from '../types/ActiveLink';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';
import { ActiveLinkContext } from '../context/ActiveLinkContext';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);
  const { activeLink } = useContext(ActiveLinkContext);
  const filteredTodos = todos.filter(todo => {
    switch (activeLink) {
      case ActiveLink.All:
        return true;
      case ActiveLink.Active:
        return !todo.completed;
      case ActiveLink.Completed:
        return todo.completed;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

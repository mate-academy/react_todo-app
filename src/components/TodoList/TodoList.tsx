import { useContext } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TodosContext } from '../../context/TodosContext';
import { Filter } from '../../types/Filter';

const TodoList = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodosContext must be used within a TodosProvider');
  }

  const { state } = context;
  const { todos, filter } = state;

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      case Filter.All:
      default:
        return true;
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

export default TodoList;

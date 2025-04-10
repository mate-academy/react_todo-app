import { useTodos } from '../context/TodosContext';
import { TodoItem } from './Todo';

export const TodosList: React.FC = () => {
  const { visibleTodos, handleChecked, handleDeleteTodo } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChecked={handleChecked}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </section>
  );
};

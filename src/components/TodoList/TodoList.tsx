import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const { filteredTodos, toggleTodo, updateTodo, deleteTodo } =
    useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </section>
  );
};

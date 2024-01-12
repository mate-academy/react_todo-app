import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';

export const Todolist: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.length > 0 && todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

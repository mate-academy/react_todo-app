import { useContext } from 'react';
import { TodoContextType } from '../../types/types';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext) as TodoContextType;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

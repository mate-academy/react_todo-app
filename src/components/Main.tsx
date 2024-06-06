import { PropsMain } from '../types';
import { TodoItem } from './todo';

export const Main: React.FC<PropsMain> = ({ todos, setTodos }) => {
  return (
    <section data-cy="TodoList" className="todoapp__main">
      {todos.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.completed}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </section>
  );
};

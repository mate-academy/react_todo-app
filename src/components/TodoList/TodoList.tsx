import { useContext } from 'react';
import { TodosContext } from '../TodoContext/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <>
      {filteredTodos && (
        <ul className="todo-list" data-cy="todosList">
          {filteredTodos.map(item => (
            <TodoItem
              todo={item}
              key={item.id}
            />
          ))}
        </ul>
      )}
    </>
  );
};

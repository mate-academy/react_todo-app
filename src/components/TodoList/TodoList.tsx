import { useContext } from 'react';
import { TodosContext } from '../TodoContext/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <>
      {filteredTodos && (
        <ul className="todo-list" data-cy="todosList">
          {filteredTodos().map(item => (
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

import { useContext } from 'react';
import { TodoItem } from '../Todo-Item/TodoItem';
import { TodosContext } from '../../TodosContext';

export const TodoList: React.FC = () => {
  const { filteredTodo } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <ul className="todo-list" data-cy="todosList">
        {filteredTodo.length > 0 &&
          filteredTodo.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    </section>
  );
};

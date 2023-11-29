import { useContext, useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { TodoContext } from '../TodoContext';
import { FilterContext } from '../FilterContext';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { todos } = useContext(TodoContext);
  const { status } = useContext(FilterContext);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    switch (status) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
    }
  }, [status, todos]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {items && filteredTodos
        .map((todo: Todo) => <TodoItem todo={todo} key={todo.id} />)}
    </ul>
  );
};

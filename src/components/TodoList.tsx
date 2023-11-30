import { useContext, useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { TodoContext } from '../TodoContext';

export const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodoContext);
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

  if (todos.length > 0) {
    return (
      <ul className="todo-list" data-cy="todosList">
        {filteredTodos
          .map((todo: Todo) => <TodoItem todo={todo} key={todo.id} />)}
      </ul>
    );
  }

  return null;
};

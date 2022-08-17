import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Status } from './types/Status';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosProvider';

import './styles/todo-list.scss';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);
  const params = useParams();
  let filteredTodos = todos;

  if (params.filter) {
    switch (params.filter) {
      case Status.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

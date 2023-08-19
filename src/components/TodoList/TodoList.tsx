import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../enums/Status';

export const TodoList = () => {
  const { todos, filter } = useContext(TodosContext);

  let filteredTodos = todos;

  if (filter === Status.Active) {
    filteredTodos = todos.filter(todo => todo.completed !== Status.Completed);
  }

  if (filter === Status.Completed) {
    filteredTodos = todos.filter(todo => todo.completed === Status.Completed);
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos && filteredTodos.map(
        (item: Todo) => <TodoItem item={item} key={item.id} />,
      )}
    </ul>
  );
};

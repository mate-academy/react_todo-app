import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../Types/Todo';

interface Props {
  todos: Todo[],
  handleComplete: (selectedTodoId: number) => void,
  handleDelete: (selectedTodoId: number) => void,
  handleEdit: (selectedTodoId: number, editingValue: string) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleComplete,
  handleDelete,
  handleEdit,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          key={todo.id}
        />
      ))}
    </ul>
  );
};

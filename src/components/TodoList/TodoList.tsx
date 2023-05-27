import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal/TodoModal';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  deleteTodo: (todoId: number) => void;
  editedTodos: number[];
  handleUpdateTodoStatus: (todo: Todo) => void;
  handleEditTitleError: () => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  tempTodo,
  editedTodos,
  handleUpdateTodoStatus,
  handleEditTitleError,
}) => (
  <>
    {todos.map((todo) => (
      <TodoModal
        todo={todo}
        key={todo.id}
        isBeingEdited={editedTodos.includes(todo.id)}
        deleteTodo={deleteTodo}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleEditTitleError={handleEditTitleError}
      />
    ))}
    {tempTodo && (
      <TodoModal
        todo={tempTodo}
        isBeingEdited
        deleteTodo={deleteTodo}
        handleUpdateTodoStatus={handleUpdateTodoStatus}
        handleEditTitleError={handleEditTitleError}
      />
    )}
  </>
);

import { deleteTodo, patchTodo } from '../../api/todos';
import { TodoElement } from '../TodoElement/TodoElement';
import { useTodos } from '../TodosContext';
import { Todo } from '../types/Todo';

interface TodoappMainProps {
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoappMain: React.FC<TodoappMainProps> = ({
  filteredTodos,
  inputRef,
}) => {
  const { todos, setTodos } = useTodos();

  const handleTodoDelete = async (idTodo: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== idTodo));

    try {
      await deleteTodo(idTodo);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== idTodo));
      inputRef.current?.focus();

      return true;
    } catch {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === idTodo ? { ...todo, isLoaded: true } : todo,
        ),
      );

      return false;
    }
  };

  const handleToggleStatus = async (todoToUpdate: Todo) => {
    const idTodo = todoToUpdate.id;

    const updatedTodos = todos.map(todo =>
      todo.id === idTodo ? { ...todo, isLoaded: false } : todo,
    );

    setTodos(updatedTodos);

    try {
      const updated = await patchTodo(idTodo, {
        completed: !todoToUpdate.completed,
      });

      const updatedTodosList = todos.map(todo =>
        todo.id === idTodo ? { ...updated, isLoaded: true } : todo,
      );

      setTodos(updatedTodosList);
    } catch {
      const notUpdatedTodos = todos.map(todo =>
        todo.id === idTodo ? { ...todo, isLoaded: true } : todo,
      );

      setTodos(notUpdatedTodos);
    }
  };

  const handleUpdateTodo = async (
    updatedTodo: Todo,
    setIsEditing: (val: boolean) => void,
    setEditedTitle: (val: string) => void,
    trimmedTitle: string,
  ) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? { ...todo, isLoaded: false } : todo,
    );

    setTodos(updatedTodos);

    try {
      const serverTodo = await patchTodo(updatedTodo.id, {
        title: updatedTodo.title,
      });

      const updatedTodosList = todos.map(todo =>
        todo.id === serverTodo.id
          ? { ...todo, title: updatedTodo.title.trim(), isLoaded: true }
          : todo,
      );

      setTodos(updatedTodosList);

      setEditedTitle(trimmedTitle);
      setIsEditing(false);

      return true;
    } catch {
      setIsEditing(true);

      const notUpdatedTodos = todos.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, isLoaded: true } : todo,
      );

      setTodos(notUpdatedTodos);

      return false;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoElement
          key={todo.id}
          todo={todo}
          handleTodoDelete={handleTodoDelete}
          handleToggleStatus={handleToggleStatus}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
    </section>
  );
};

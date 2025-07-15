import { deleteTodo, patchTodo } from '../../api/todos';
import { FilterType } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { useUpdateTodo } from '../../utils/helpers';
import { useFilter } from '../FilterContext';
import { TodoElement } from '../Todo/TodoElement';
import { useTodos } from '../TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const { filter } = useFilter();
  const updateTodo = useUpdateTodo();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
      default:
        return true;
    }
  });

  const handleTodoDelete = async (idTodo: number) => {
    updateTodo(idTodo, false);

    try {
      await deleteTodo(idTodo);
      const updatedTodoList = todos.filter(todo => todo.id !== idTodo);

      setTodos(updatedTodoList);

      return true;
    } catch {
      updateTodo(idTodo, true);

      return false;
    }
  };

  const handleToggleStatus = async (todoToUpdate: Todo) => {
    const idTodo = todoToUpdate.id;

    updateTodo(idTodo, false);

    try {
      const updated = await patchTodo(idTodo, {
        completed: !todoToUpdate.completed,
      });

      const updatedTodos = todos.map(todo =>
        todo.id === idTodo ? { ...updated, isLoaded: true } : todo,
      );

      setTodos(updatedTodos);
    } catch {
      updateTodo(idTodo, true);
    }
  };

  const handleUpdateTodo = async (
    updatedTodo: Todo,
    setIsEditing: (val: boolean) => void,
    setEditedTitle: (val: string) => void,
    trimmedTitle: string,
  ) => {
    updateTodo(updatedTodo.id, false);

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

      const updatedTodosList = todos.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, isLoaded: true } : todo,
      );

      setTodos(updatedTodosList);

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
          handleToggleStatus={() => handleToggleStatus(todo)}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
    </section>
  );
};

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
  const { setTodos } = useTodos();

  const handleTodoDelete = async (idTodo: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== idTodo);

      inputRef.current?.focus();
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });

    return true;
  };

  const handleToggleStatus = (todoToUpdate: Todo) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === todoToUpdate.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const handleUpdateTodo = async (
    updatedTodo: Todo,
    setIsEditing: (val: boolean) => void,
    setEditedTitle: (val: string) => void,
    trimmedTitle: string,
  ) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...todo, title: trimmedTitle, isLoaded: false }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setEditedTitle(trimmedTitle);
      setIsEditing(false);

      return updatedTodos;
    });

    return true;
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

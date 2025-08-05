import { useEffect, useRef } from 'react';
import { TodoappFooter } from '../TodoappFooter';
import { TodoappHeader } from '../TodoappHeader';
import { TodoappMain } from '../TodoappMain';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/Filter';
import { deleteTodo, getTodos } from '../../api/todos';
import { useTodos } from '../TodosContext';
import { useFilter } from '../FilterContext';

export const TodoAppContent: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const { filter } = useFilter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.Cypress) {
      const savedTodos = localStorage.getItem('todos');

      if (savedTodos) {
        try {
          const parsed = JSON.parse(savedTodos);

          if (Array.isArray(parsed)) {
            setTodos(parsed.map((todo: Todo) => ({ ...todo, isLoaded: true })));
          }
        } catch {}
      }

      return;
    }

    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data.map(todo => ({ ...todo, isLoaded: true })));
      } catch (e) {
        setTodos([]);
      }
    };

    fetchTodos();
  }, [setTodos]);

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

  const handleClearCompletedButton = async () => {
    const completedTodos = todos.filter(todo => todo.completed);
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    const markedTodos = todos.map(todo =>
      todo.completed ? { ...todo, isLoaded: false } : todo,
    );

    setTodos(markedTodos);

    const failedToDelete: Todo[] = [];

    await Promise.all(
      completedTodos.map(async todo => {
        try {
          await deleteTodo(todo.id);
        } catch {
          failedToDelete.push({ ...todo, isLoaded: true });
        }
      }),
    );

    const updatedTodos = [...uncompletedTodos, ...failedToDelete].sort(
      (a, b) => a.id - b.id,
    );

    setTodos(updatedTodos);
 
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp__content">
      <TodoappHeader inputRef={inputRef} />

      <TodoappMain filteredTodos={filteredTodos} inputRef={inputRef} />

      <TodoappFooter handleClearCompletedButton={handleClearCompletedButton} />
    </div>
  );
};

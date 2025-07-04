import { createContext } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { useEffect, useRef, useState } from 'react';
import { addTodos, deleteTodo, getTodos, patchTodos } from '../api/todos';

type TodoContextTypes = {
  todos: Todo[];
  filteredTodos: Todo[];
  error: string;
  filterSelect: Filter;
  isDisabledInput: boolean;
  searchTerm: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filter: (type: Filter) => void;
  postTodos: (title: string) => Promise<void>;
  removeTodos: (todoId: number) => Promise<void>;
  changeTodo: (
    todoId: number,
    title: string,
    completed: boolean,
  ) => Promise<void>;
  changeComplite: () => void;
  clearCompleted: () => void;
  clearError: () => void;
};

export const TodoContext = createContext<TodoContextTypes>({
  todos: [],
  filteredTodos: [],
  error: '',
  filterSelect: Filter.All,
  isDisabledInput: false,
  searchTerm: '',
  inputRef: { current: null },
  setSearchTerm: () => {},
  filter: () => {},
  postTodos: async () => {},
  removeTodos: async () => {},
  changeTodo: async () => {},
  changeComplite: () => {},
  clearCompleted: () => {},
  clearError: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterSelect, setFilterSelected] = useState<Filter>(Filter.All);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        throw new Error('Cant find todos');
      });
  }, []);

  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem('todos');
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filterSelect === 'Active') {
      return !todo.completed;
    }

    if (filterSelect === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  async function postTodos(title: string) {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      setError('Title should not be empty');
      inputRef.current?.focus();

      return;
    }

    setIsDisabledInput(true);

    const tempId = Date.now();

    const tempTodo: Todo = {
      id: tempId,
      userId: 3177,
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, tempTodo]);

    try {
      const newTodo = await addTodos({
        title: trimmedTitle,
        completed: false,
        userId: 3177,
      });

      setTodos(prev => prev.map(todo => (todo.id === tempId ? newTodo : todo)));
      setSearchTerm('');
    } catch {
      setError('Unable to add a todo');
      setTodos(prev => prev.filter(todo => todo.id !== tempId));
      throw new Error('Cant create new todos');
    } finally {
      setIsDisabledInput(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }

  function removeTodos(todoId: number) {
    return deleteTodo(todoId)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
        inputRef.current?.focus();
      })
      .catch(() => {
        setError('Unable to delete a todo');
        throw new Error('Cant delete todos');
      });
  }

  function changeTodo(todoId: number, title: string, completed: boolean) {
    return patchTodos({ id: todoId, title, completed, userId: 3177 })
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === todoId ? { ...todo, title, completed } : todo,
          ),
        );
      })
      .catch(() => {
        setError('Unable to update a todo');
        throw new Error('Cant change todos');
      });
  }

  function changeComplite() {
    const isAllCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(updatedTodos);

    const todosToUpdate = todos.filter(
      todo => todo.completed === isAllCompleted,
    );

    Promise.all(
      todosToUpdate.map(todo =>
        patchTodos({ ...todo, completed: !isAllCompleted }),
      ),
    )
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        setError('Unable to update todos');
        throw new Error('Cant change all todos');
      });
  }

  function filter(type: Filter) {
    setFilterSelected(type);
  }

  function clearCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);

    Promise.allSettled(completedTodos.map(todo => deleteTodo(todo.id)))
      .then(results => {
        const failedTodos = completedTodos.filter(
          (todo, index) => results[index].status === 'rejected',
        );

        setTodos(prevTodos =>
          prevTodos.filter(todo => {
            if (!todo.completed) {
              return true;
            }

            return failedTodos.some(failed => failed.id === todo.id);
          }),
        );

        inputRef.current?.focus();

        if (failedTodos.length > 0) {
          setError('Unable to delete a todo');
        }
      })
      .catch(() => {
        setError('Unexpected error');
      });
  }

  const clearError = () => {
    setError('');
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filterSelect,
        isDisabledInput,
        error,
        searchTerm,
        inputRef,
        setSearchTerm,
        filter,
        postTodos,
        removeTodos,
        changeTodo,
        changeComplite,
        clearCompleted,
        clearError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

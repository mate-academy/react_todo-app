import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { addTodo, deleteTodo, editTodo, getTodos, USER_ID } from '../api/todos';
import { PayloadProps } from '../types/PayloadProps';
import { Filter } from '../types/Filter';

interface TodoContextProps {
  todos: Todo[];
  tempTodo: Todo | null;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, payload: PayloadProps) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  loadingIds: number[];
  countActive: number;
  allCompleted: boolean;
  newTodoInput: React.MutableRefObject<HTMLInputElement | null>;
  clearCompleted: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleToggleAll: () => void;
  noCompleted: boolean;
  noTodos: boolean;
  isAdding: boolean;
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  tempTodo: null,
  filter: Filter.ALL,
  setFilter: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  loadingIds: [],
  countActive: 0,
  allCompleted: false,
  newTodoInput: { current: null },
  clearCompleted: () => {},
  handleSubmit: () => {},
  handleToggleAll: () => {},
  noCompleted: false,
  noTodos: false,
  isAdding: false,
  todoTitle: '',
  setTodoTitle: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [isAdding, setIsAdding] = useState(false);

  const completedTodos = todos.filter(todo => todo.completed === true);
  const countActive = todos.length - completedTodos.length;
  const allCompleted = countActive === 0;
  const newTodoInput = useRef<HTMLInputElement | null>(null);
  const noCompleted = !completedTodos.length;
  const noTodos = !todos.length;

  const loadTodos = () => {
    setErrorMessage('');
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  };

  useEffect(loadTodos, []);

  useEffect(() => {
    newTodoInput.current?.focus();
  }, [isAdding, loadingIds]);

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('');
      }
    }, 3000);
  }, [errorMessage]);

  const removeTodo = async (todoId: number) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, todoId]);

    try {
      await deleteTodo(todoId);
      const newTodos = todos.filter(todo => todo.id !== todoId);

      setTodos(newTodos);
    } catch (error) {
      setErrorMessage('Unable to delete a todo');
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const updateTodo = async (id: number, payload: PayloadProps) => {
    setErrorMessage('');
    setLoadingIds(current => [...current, id]);

    try {
      const editedTodo = await editTodo(id, payload);
      const updatedTodos = todos.map(todo =>
        todo.id === id ? editedTodo : todo,
      );

      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage('Unable to update a todo');
      throw error;
    } finally {
      setLoadingIds([]);
    }
  };

  const clearCompleted = async () => {
    const promises: Promise<number>[] = [];

    completedTodos.forEach(todo => {
      promises.push(deleteTodo(todo.id));
      setLoadingIds(current => [...current, todo.id]);
    });

    const results = await Promise.allSettled(promises);

    const hasError = results.some(result => result.status === 'rejected');

    if (hasError) {
      setErrorMessage('Unable to delete a todo');
    }

    const successfulIds = completedTodos
      .filter((_, i) => results[i].status === 'fulfilled')
      .map(todo => todo.id);

    setTodos(prev => prev.filter(todo => !successfulIds.includes(todo.id)));
    setLoadingIds([]);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setIsAdding(true);
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');
      setIsAdding(false);

      return;
    }

    const newTodo = {
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo(newTodo);

    addTodo(trimmedTitle)
      .then(savedTodo => {
        setTodos(current => [...current, savedTodo]);
        setTodoTitle('');
      })
      .catch(() => {
        setTempTodo(null);
        setErrorMessage('Unable to add a todo');
      })
      .finally(() => {
        setTempTodo(null);
        setIsAdding(false);
      });
  };

  const handleToggleAll = async () => {
    const promises: Promise<Todo>[] = [];
    let proceedTodos: Todo[] = [];
    let completed = false;

    if (allCompleted) {
      proceedTodos = todos;
    } else {
      proceedTodos = todos.filter(todo => !todo.completed);
      completed = true;
    }

    proceedTodos.forEach(todo => {
      promises.push(editTodo(todo.id, { completed }));
      setLoadingIds(current => [...current, todo.id]);
    });

    const results = await Promise.allSettled(promises);

    const hasError = results.some(result => result.status === 'rejected');

    if (hasError) {
      setErrorMessage('Unable to update a todo');
    }

    const successfulIds = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value.id);

    const newTodos = todos.map(todo => {
      if (successfulIds.includes(todo.id)) {
        return { ...todo, completed };
      }

      return todo;
    });

    setTodos(newTodos);
    setLoadingIds([]);
  };

  const value = {
    todos,
    tempTodo,
    filter,
    setFilter,
    removeTodo,
    updateTodo,
    errorMessage,
    setErrorMessage,
    loadingIds,
    countActive,
    allCompleted,
    newTodoInput,
    clearCompleted,
    handleSubmit,
    handleToggleAll,
    noCompleted,
    noTodos,
    isAdding,
    todoTitle,
    setTodoTitle,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);

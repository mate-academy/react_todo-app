import React,
{
  useState,
  useMemo,
  useCallback,
  useEffect,

} from 'react';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

type ContextItems = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  deleteCompletedTodo: () => void;
  updateTodo: (updatedTodo: Todo) => void;

};

export const TodosContext = React.createContext<ContextItems>({
  todos: initialState,
  addTodo: () => { },
  deleteTodo: () => { },
  deleteCompletedTodo: () => { },
  updateTodo: () => { },
});

type Props = {
  children: React.ReactNode
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(initialState);

  useEffect(() => {
    const value = localStorage.getItem('todos');

    if (value) {
      setTodos(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos
      .filter(todo => todo.id !== todoId));
  }, []);

  const deleteCompletedTodo = () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedIds.forEach(id => deleteTodo(id));
  };

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(
        currentTodo => currentTodo.id === updatedTodo.id,
      );

      newTodos.splice(index, 1, updatedTodo);

      return newTodos;
    });
  }, []);

  const value = useMemo(() => ({
    todos,
    addTodo,
    deleteTodo,
    deleteCompletedTodo,
    updateTodo,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

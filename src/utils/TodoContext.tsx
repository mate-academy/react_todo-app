import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { Todo } from '../types/Todo';

type ContextItems = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (todoId: number) => void,
};

export const TodosContext = React.createContext<ContextItems>({
  todos: [],
  addTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo = {
        id: +new Date(),
        title,
        completed: false,
      };

      if (!title.length) {
        return;
      }

      setTodos(prevTodo => [newTodo, ...prevTodo]);
    } catch {
      throw new Error('Unable to add todo, please try again later');
    }
  }, [todos]);

  // const updateTodo = useCallback((updatedTodo: Todo) => {
  //   setTodos(currTodos => {
  //     const updTodos = [...currTodos];
  //     const index = updTodos.findIndex(todo => todo.id === updatedTodo.id);

  //     updTodos.splice(index, 1, updatedTodo);

  //     return updTodos;
  //   });
  // }, []);

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currTodos => {
      const updTodos = [...currTodos];
      const index = updTodos.findIndex(todo => todo.id === updatedTodo.id);

      updTodos.splice(index, 1, updatedTodo);

      return updTodos;
    });
  };

  const deleteTodo = useCallback((todoId: number) => {
    try {
      setTodos(currTodo => currTodo.filter(todo => todo.id !== todoId));
    } catch {
      throw new Error('Unable to delete a todo, please try again later');
    }
  }, []);

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export function useTodos() {
  const context = useContext(TodosContext);

  return context;
}

import React, { createContext, useState } from 'react';
import { Todo } from '../type/Todo';

type ContextTodos = {
  updateTodo: (editValue: string, selectedTodo: Todo) => void;
  selectedPost: null | Todo;
  setSelectedPost: (todo: Todo | null) => void;
  clearCompleted: () => void;
  makeToggleAll: (status: boolean) => void;
  deleteTodo: (id: number) => void;
  makeTodoCompleted: (id: number, status: boolean) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<ContextTodos>({
  updateTodo: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  clearCompleted: () => {},
  makeToggleAll: () => {},
  deleteTodo: () => {},
  makeTodoCompleted: () => {},
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
});

function useLocalStorage<T>(todos: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(todos);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing localStorage data:', e);
      localStorage.removeItem(todos);

      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(todos, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [selectedPost, setSelectedPost] = useState<null | Todo>(null);

  const addTodo = (title: string) => {
    return setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), title: title, completed: false },
    ]);
  };

  const makeTodoCompleted = (id: number, status: boolean) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: status,
          };
        } else {
          return todo;
        }
      });

      return newTodos;
    });
  };

  const deleteTodo = (id: number) => {
    return setTodos(prevTodos => {
      const copyPrev = [...prevTodos];
      const index = prevTodos.findIndex(todo => todo.id === id);

      copyPrev.splice(index, 1);

      return copyPrev;
    });
  };

  const makeToggleAll = (status: boolean) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => ({ ...todo, completed: status }));
    });
  };

  const clearCompleted = () => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => !todo.completed);
    });
  };

  const itemsLeft = todos.filter(todo => !todo.completed);

  const updateTodo = (editValue: string, selectedTodo: Todo) => {
    return setTodos(prevTodo => {
      const newTodo = [...prevTodo];
      const index = newTodo.findIndex(todo => todo.id === selectedTodo?.id);

      if (selectedTodo) {
        newTodo[index].title = editValue;
      }

      return newTodo;
    });
  };

  const todosTools = {
    updateTodo,
    selectedPost,
    setSelectedPost,
    clearCompleted,
    makeToggleAll,
    deleteTodo,
    makeTodoCompleted,
    todos,
    setTodos,
    addTodo,
    itemsLeft,
  };

  return (
    <TodosContext.Provider value={todosTools}>{children}</TodosContext.Provider>
  );
};

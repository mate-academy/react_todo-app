import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/todo';
import useLocalStorage from '../hooks/useLocalStorage.hook';
import { SortType } from '../enums/SortType';
import { v4 as uuidv4 } from 'uuid';

type AppContextContainerProps = {
  todos: Todo[];
  addNewTodo: (todoTitle: string) => void;
  changeTitle: (id: string, value: string) => void;
  clearCompleted: () => void;
  ckickEsc: (id: string, pastTitle: string) => void;
  editTodo: (id: string) => void;
  makeTodosActive: () => void;
  makeTodosCompleted: () => void;
  removeTodo: (id: string) => void;
  switchEdited: (id: string) => void;
  todoCompleted: (id: string) => void;
  sortType: SortType;
  changeSortType: (option: SortType) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

type Props = {
  children: ReactNode;
};

const AppContextContainer = createContext({} as AppContextContainerProps);

export const useAppContextContainer = () => {
  const context = useContext(AppContextContainer);

  if (context === undefined) {
    throw new Error(
      'Context must be used within an AppContextContainerProvider',
    );
  }

  return context;
};

export const AppContext = ({ children }: Props) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [sortType, setSortType] = useState<SortType>(SortType.ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewTodo = (todoTitle: string) => {
    setTodos(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: todoTitle.trim(),
        completed: false,
        isEdited: false,
      },
    ]);
  };

  const changeTitle = (id: string, value: string) => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, title: value };
        }

        return el;
      }),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(el => !el.completed));
  };

  const ckickEsc = (id: string, pastTitle: string) => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, title: pastTitle, isEdited: false };
        }

        return el;
      }),
    );
  };

  const editTodo = (id: string) => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, isEdited: true };
        }

        return el;
      }),
    );
  };

  const makeTodosActive = () => {
    setTodos(prev => prev.map(el => ({ ...el, completed: !el.completed })));
  };

  const makeTodosCompleted = () => {
    setTodos(prev => prev.map(el => ({ ...el, completed: true })));
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(el => el.id !== id));
  };

  const switchEdited = (id: string) => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, title: el.title.trim(), isEdited: false };
        }

        return el;
      }),
    );
  };

  const todoCompleted = (id: string) => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, completed: !el.completed };
        }

        return el;
      }),
    );
  };

  const changeSortType = (option: SortType) => {
    setSortType(option);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AppContextContainer.Provider
      value={{
        todos,
        removeTodo,
        changeTitle,
        switchEdited,
        ckickEsc,
        todoCompleted,
        editTodo,
        makeTodosCompleted,
        makeTodosActive,
        clearCompleted,
        addNewTodo,
        sortType,
        changeSortType,
        inputRef,
      }}
    >
      {children}
    </AppContextContainer.Provider>
  );
};

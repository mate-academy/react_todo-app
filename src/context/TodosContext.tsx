/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { myLocalStorage } from '../localStorage';
import { Filter, Names } from '../enums/Filter';

// #region context

interface TodosContextType {
  todos: Todo[];
  activeTodos: number;
  value: string;
  filter: string;
  headerInputRef: React.MutableRefObject<HTMLInputElement | null>;
  setTodos: (todos: Todo[]) => void;
  setValue: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  setFilter: (value: Filter) => void;
  toogleHandler: (id: number) => void;
  deleteHandler: (ids: number[]) => void;
}

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  activeTodos: 0,
  value: '',
  filter: '',
  headerInputRef: {
    current: null,
  },
  setTodos: () => {},
  setValue: () => {},
  onSubmit: () => {},
  setFilter: () => {},
  toogleHandler: () => {},
  deleteHandler: () => {},
});

// #endregion

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  // #region states

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState(Filter.all);

  // #endregion
  // #region refs

  const headerInputRef = useRef<HTMLInputElement | null>(null);

  // #endregion
  // #region handlers

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const todoId = +new Date();
    const todo = {
      id: todoId,
      title: value.trim(),
      completed: false,
    };

    myLocalStorage.setItem(Names.todos, JSON.stringify([...todos, todo]));
    setTodos(currentTodos => [...currentTodos, todo]);

    setValue('');
  };

  const toogleHandler = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const { completed } = todo;

        return { ...todo, completed: !completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
    myLocalStorage.setItem(Names.todos, JSON.stringify(updatedTodos));
  };

  const deleteHandler = (ids: number[]) => {
    const updatedTodos = todos.filter(todo => !ids.includes(todo.id));

    setTodos(updatedTodos);
    myLocalStorage.setItem(Names.todos, JSON.stringify(updatedTodos));
    headerInputRef.current?.focus();
  };

  // #endregion
  // #region variables

  const activeTodos = todos.filter(_todo => !_todo.completed).length;

  // #endregion
  // #region useEffects

  useEffect(() => {
    const getTodos = myLocalStorage.getItem(Names.todos);

    if (!getTodos) {
      myLocalStorage.setItem(Names.todos, JSON.stringify([]));
    } else {
      setTodos(JSON.parse(getTodos as string));
    }

    headerInputRef.current?.focus();
  }, []);

  // #endregion
  // #region contextValue

  const contextValue = useMemo(
    () => ({
      todos,
      activeTodos,
      value,
      filter,
      headerInputRef,
      setTodos,
      setValue,
      onSubmit,
      setFilter,
      toogleHandler,
      deleteHandler,
    }),
    [todos, value, filter],
  );

  // #endregion

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

import React, {
  Dispatch,
  SetStateAction, useMemo, useState,
} from 'react';
import { Status, Todo } from '../types/todo';

export const TodosContext = React.createContext({
  todoItems: [] as Todo[],
  setTodoItems: {} as Dispatch<SetStateAction<Todo[]>>,
  selectedStatus: Status.all,
  setSelectedStatus: {} as Dispatch<SetStateAction<Status>>,
  title: '' as string,
  setTitle: {} as Dispatch<SetStateAction<string>>,
  visibleTodos: [] as Todo[],
});

type Props = {
  children: React.ReactNode,
};

function useLocalStorage<T>(
  key: string, startValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const init = () => {
    const data = localStorage.getItem(key);

    if (data === null || data === undefined) {
      localStorage.setItem(key, '[]');

      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Error parsing localStorage data for key "${key}":`, e);
      localStorage.removeItem(key);

      return startValue;
    }
  };

  const start = init();

  const [value, setValue] = useState(start);

  const save: Dispatch<SetStateAction<T>> = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
      // eslint-disable-next-line no-console
      console.log(newValue);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Error saving to localStorage for key "${key}":`, e);
    }
  };

  return [value, save];
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todoItems, setTodoItems] = useLocalStorage<Todo[]>('todoItems', []);
  const [selectedStatus, setSelectedStatus] = useState(Status.all);
  const [title, setTitle] = useState('');

  const visibleTodos = [...todoItems].filter(todo => {
    switch (selectedStatus) {
      case Status.active:
        return !todo.completed;
      case Status.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const values = useMemo(() => ({
    todoItems,
    setTodoItems,
    selectedStatus,
    setSelectedStatus,
    title,
    setTitle,
    visibleTodos,
  }), [todoItems, setTodoItems, selectedStatus, title, visibleTodos]);

  return (
    <TodosContext.Provider value={values}>
      {children}
    </TodosContext.Provider>
  );
};

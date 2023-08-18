import React, { useMemo, useState } from 'react';
import { Filter } from '../types/Filters';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialItems: Todo[] = [];
const defaultKey = 'todo';

type State = {
  items: Todo[];
  filter: Filter;
  addItem: (value: string) => void;
  deleteItem: (id: number) => void;
  setFilter: (value: Filter) => void;
  setItems: (newItems: Todo[]) => void;
  getVisibleItems(
    mode: Filter,
    itemsList: Todo[],
  ): Todo[];
};

const state: State = {
  items: initialItems,
  filter: Filter.ALL,
  addItem: () => {},
  deleteItem: () => {},
  setFilter: () => {},
  setItems: () => {},
  getVisibleItems: () => {
    return initialItems;
  },
};

export const TodoContext = React.createContext(state);

type Props = {
  children: React.ReactNode;
};

export const TodoGlobalProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useLocalStorage(defaultKey, initialItems);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const getVisibleItems = (filterMode: Filter, itemsList: Todo[]) => {
    switch (filterMode) {
      case Filter.ACTIVE:
        return itemsList.filter(item => !item.completed);

      case Filter.COMPLETED:
        return itemsList.filter(item => item.completed);

      default:
        return itemsList;
    }
  };

  const deleteItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);

    setItems(newItems);
  };

  const addItem = (value: string) => {
    if (value) {
      const newItem: Todo = {
        id: +new Date(),
        title: value,
        completed: false,
      };

      setItems([
        ...items,
        newItem,
      ]);
    }
  };

  const data = useMemo(() => ({
    items,
    setItems,
    filter,
    setFilter,
    deleteItem,
    addItem,
    getVisibleItems,
  }), [items, filter]);

  return (
    <TodoContext.Provider value={data}>
      {children}
    </TodoContext.Provider>
  );
};

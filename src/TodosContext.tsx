import React, { useMemo, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FilterMode } from './types/FilterMode';
import { Todos } from './types/Todos';

const intitialItems: Todos[] = [];
const defoultKey = 'todos';

type State = {
  items: Todos[];
  filterMode: FilterMode;
  addItem: (value: string) => void;
  deleteItem: (id: number) => void;
  setFilterMode: (value: FilterMode) => void;
  setItems: (newItems: Todos[]) => void;
  getVisibleItems(mode: FilterMode, itemsList: Todos[],): Todos[];
};

const state: State = {
  items: intitialItems,
  filterMode: 'all',
  addItem: () => { },
  deleteItem: () => { },
  setFilterMode: () => { },
  setItems: () => { },
  getVisibleItems: () => {
    return intitialItems;
  },
};

export const TodosContext = React.createContext(state);

type Props = {
  children: React.ReactNode;
};

export const TodosGlobalProvider: React.FC<Props> = ({ children }) => {
  const getVisibleItems = (mode: FilterMode, itemsList: Todos[]) => {
    switch (mode) {
      case 'activ':
        return itemsList.filter(item => !item.completed);
      case 'completed':
        return itemsList.filter(item => item.completed);
      default:
        return itemsList;
    }
  };

  const [items, setItems] = useLocalStorage(defoultKey, intitialItems);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const deleteItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);

    setItems(newItems);
  };

  const addItem = (value: string) => {
    if (value) {
      const newItem: Todos = {
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
    filterMode,
    setFilterMode,
    deleteItem,
    addItem,
    getVisibleItems,
  }), [items, filterMode]);

  return (
    <TodosContext.Provider value={data}>
      {children}
    </TodosContext.Provider>
  );
};

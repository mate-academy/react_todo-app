import { createContext, Dispatch } from 'react';
import { useLocalStorage } from '../CustomHooks/LocaleStorage';
import { ItemType } from '../types/types';

export type Action =
  | { type: 'ADD_TODO' | 'UPDATE_TODO'; payload: ItemType }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL'; payload: boolean }
  | { type: 'DELETE_COMPLETED' };

type DispatchType = Dispatch<Action>;

function todosHandler(state: ItemType[], action: Action): ItemType[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [action.payload, ...state];

    case 'UPDATE_TODO':
      return state.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    case 'DELETE_TODO':
      return state.filter(item => item.id !== action.payload);
    case 'TOGGLE_ALL':
      return state.map(item => ({
        ...item,
        completed: action.payload,
      }));
    case 'DELETE_COMPLETED':
      return state.filter(item => !item.completed);
    default:
      return state;
  }
}

export const TodoContext = createContext([] as ItemType[]);
export const DispatchContext = createContext((() => {}) as DispatchType);

type ProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [storage, dispatch] = useLocalStorage(todosHandler, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodoContext.Provider value={storage}>{children}</TodoContext.Provider>
    </DispatchContext.Provider>
  );
};

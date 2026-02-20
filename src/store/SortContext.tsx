import { createContext } from 'react';

type Action = 'all' | 'completed' | 'active';

export interface Props {
  sortBy: string;
  sortDispatch: React.Dispatch<Action>;
}

export const SortContext = createContext<Props>({
  sortBy: '',
  sortDispatch: () => {},
});

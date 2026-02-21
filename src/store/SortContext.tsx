import { createContext } from 'react';
import { Filters, Filter } from './filters';

export interface Props {
  sortBy: Filter;
  sortDispatch: React.Dispatch<Filter>;
}

const noop: React.Dispatch<Filter> = () => {
  throw new Error('sortDispatch must be used within SortContext.Provider');
};

export const SortContext = createContext<Props>({
  sortBy: Filters[0],
  sortDispatch: noop,
});

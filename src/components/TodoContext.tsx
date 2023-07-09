import { createContext } from 'react';

type Props = {
  isClearAllCompleted: boolean
  isToggleAllCompleted: boolean
  isToggleAllActive: boolean
  inputValue: string,
  todosGetter: () => void
  setIsDeleteError: (errorState: boolean) => void
  setIsPostError: (errorState: boolean) => void
};

export const TodoContext = createContext<Props>(
  {
    isClearAllCompleted: false,
    isToggleAllCompleted: false,
    isToggleAllActive: false,
    inputValue: '',
    todosGetter: () => {},
    setIsDeleteError: () => {},
    setIsPostError: () => {},
  },
);

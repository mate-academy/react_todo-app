import React, { useMemo } from 'react';
import { RefsContext } from './RefsContext';
import { SelectedTodoContext } from './SelectedTodoContext';

interface FocusContextType {
  handleFocus: () => void;
}

export const FocusContext = React.createContext<FocusContextType>({
  handleFocus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FocusProvider: React.FC<Props> = ({ children }) => {
  const { newTodoRef, selectedTodoRef } = React.useContext(RefsContext);
  const { selectedTodo } = React.useContext(SelectedTodoContext);

  const handleNewTodoFocus = () => {
    if (newTodoRef && newTodoRef.current) {
      newTodoRef.current.focus();
    }
  };

  const handleSelectedTodoFocus = () => {
    if (selectedTodoRef && selectedTodoRef.current) {
      selectedTodoRef.current.focus();
    }
  };

  const value = useMemo(
    () => ({
      handleFocus: () => {
        if (selectedTodo) {
          handleSelectedTodoFocus();
        } else {
          handleNewTodoFocus();
        }
      },
    }),
    [selectedTodo],
  );

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
};

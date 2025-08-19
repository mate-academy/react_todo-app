import React, { createContext } from 'react';
import { Action } from '../Enum/Action';
import { Todo } from '../Type/Todo';
import { useEdit } from '../Hooks/useEdit';

type EditedItems = {
  todosForChange?: Todo[];
  actionType: keyof typeof Action;
  editedTitle?: string;
};

type EditContextType = {
  setEditedTodoList: (args: EditedItems) => void;
};

export const EditContext = createContext<EditContextType>({
  setEditedTodoList: () => {},
});

export const EditContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setEditedTodoList = useEdit();

  return (
    <EditContext.Provider value={{ setEditedTodoList }}>
      {children}
    </EditContext.Provider>
  );
};

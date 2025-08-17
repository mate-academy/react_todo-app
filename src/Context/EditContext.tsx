import React, { createContext, useContext } from 'react';
import { Edit } from '../Enum/Edit';
import { Todo } from '../Type/Todo';
import { TodoListContext } from './TodoListContext';
import { useEdit } from '../Hooks/useEdit';

type EditedItems = {
  todosForChange?: Todo[];
  editType: keyof typeof Edit;
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
  const { todoList } = useContext(TodoListContext);

  const setEditedTodoList = useEdit(todoList);

  return (
    <EditContext.Provider value={{ setEditedTodoList }}>
      {children}
    </EditContext.Provider>
  );
};

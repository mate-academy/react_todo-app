import { useLocalStorage } from '../hooks/useLocalStorage';
import { OrderItems, Status } from '../types/Type';
import React, { useContext, useState } from 'react';

interface TodoContextType {
  orderItems: OrderItems[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItems[]>>;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const TodoContext = React.createContext<TodoContextType>({
  orderItems: [],
  setOrderItems: () => {},
  status: Status.All,
  setStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [orderItems, setOrderItems] = useLocalStorage<OrderItems[]>(
    'todos',
    [],
  );
  const [status, setStatus] = useState<Status>(Status.All);

  const value = { orderItems, setOrderItems, setStatus, status };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);

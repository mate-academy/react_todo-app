/* eslint-disable prettier/prettier */
import { OrderItems, Status } from '../types/Type';
import React, { useEffect, useState } from 'react';

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

// export const useTodos = () => {
//   const cont = useContext(TodoContext);

//   if (!cont) {
//     throw new Error('Context not workong');
//   }

//   return cont;
// };
export function useLocalStorage<T>(
  key: string,
  startValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    return JSON.parse(data);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [orderItems, setOrderItems] = useLocalStorage<OrderItems[]>(
    'todos',
    [],
  );
  const [status, setStatus] = useState<Status>(Status.All);

  const value = { orderItems, setOrderItems, setStatus, status };
  // const value = useMemo(
  //   () => ({ orderItems, setOrderItems, setStatus, status }),
  //   [orderItems, status, setOrderItems],
  // );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

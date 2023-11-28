import React from 'react';
import { Todo } from './types/Todo';

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => {},
});

// interface Props {
//   children: React.ReactNode;
// }

// export const TodoProvider: React.FC<Props> = ({ children }) => {
//   // const value = useMemo(() => ({
//   //   todos,
//   //   setTodos,
//   // }), [todos, setTodos]);

//   return (
//     <TodoContext.Provider value={{ todos, setTodos }}>
//       {children}
//     </TodoContext.Provider>
//   );
// };

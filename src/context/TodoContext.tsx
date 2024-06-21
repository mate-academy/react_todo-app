// import React, { useMemo, useState } from 'react';
// import { Todo } from '../types/Todo';

// export const TodoContext = React.createContext({
//   todos: [],
//   setTodos: (todos: Todo[]) => {},
// });

// type Props = {
//   children: React.ReactNode;
// };

// export const TodoProvider: React.FC<Props> = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   const value = useMemo(
//     () => ({
//       todos,
//       setTodos,
//     }),
//     [todos],
//   );

//   return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
// };

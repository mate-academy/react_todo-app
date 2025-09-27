// import React from 'react';
// import { Todo } from '../types/Todo';
// import { TodoItem } from './TodoItem';

// type Props = {
//   todos: Todo[];
//   tempTodo: Todo | null;
//   onDelete: (todoId: number) => void;
//   onRename: (todoId: number, newTitle: string) => void;
//   deletingTodoIds: number[];
//   onToggleStatus: (todoId: number, newStatus: boolean) => void;
//   loadingAllTodos: boolean;
//   setError: (message: string) => void;
// };

// export const TodoList: React.FC<Props> = ({
//   todos,
//   tempTodo,
//   onDelete,
//   onRename,
//   deletingTodoIds,
//   onToggleStatus,
//   loadingAllTodos,
//   setError,
// }) => {
//   return (
//     <section className="todoapp__main" data-cy="TodoList">
//       {todos.map(todo => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           onDelete={onDelete}
//           onRename={onRename}
//           isDeleting={deletingTodoIds.includes(todo.id)}
//           onToggleStatus={onToggleStatus}
//           loading={loadingAllTodos}
//           setError={setError}
//         />
//       ))}

//       {tempTodo && (
//         <TodoItem
//           todo={tempTodo}
//           isTemp
//           onDelete={() => {}}
//           onToggleStatus={() => {}}
//           onRename={onRename}
//           setError={setError}
//         />
//       )}
//     </section>
//   );
// };

import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodosContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* {tempTodo && <TodoItem todo={tempTodo} isTemp />} */}
    </section>
  );
};

// import { useEffect } from 'react';
// import { Todo } from '../types/Todo';

// type Props = {
//   title: string;
//   setTitle: React.Dispatch<React.SetStateAction<string>>;
//   handleSubmit: (event: React.FormEvent) => void;
//   isCreating: boolean;
//   inputRef: React.RefObject<HTMLInputElement>;
//   toggleAll: () => void;
//   isAllCompleted: boolean;
//   todos: Todo[];
//   isLoadingTodos: boolean;
// };

// export const Header: React.FC<Props> = ({
//   title,
//   setTitle,
//   handleSubmit,
//   isCreating,
//   inputRef,
//   toggleAll,
//   isAllCompleted,
//   todos,
//   isLoadingTodos,
// }) => {
//   useEffect(() => {
//     if (!isCreating && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [inputRef, isCreating]);

//   return (
//     <header className="todoapp__header">
//       {!isLoadingTodos && todos.length > 0 && (
//         <button
//           type="button"
//           className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
//           data-cy="ToggleAllButton"
//           onClick={toggleAll}
//         />
//       )}

//       <form onSubmit={handleSubmit}>
//         <input
//           ref={inputRef}
//           data-cy="NewTodoField"
//           type="text"
//           className="todoapp__new-todo"
//           placeholder="What needs to be done?"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           disabled={isCreating}
//         />
//       </form>
//     </header>
//   );
// };

import { useEffect } from 'react';
import { useTodos } from '../context/TodosContext';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  isAllCompleted: boolean;
};

export const Header: React.FC<Props> = ({ inputRef, isAllCompleted }) => {
  const {
    value: { todos },
    loadingTodoIds,
    handleSubmit,
    isCreating,
    title,
    setTitle,
    toggleAll,
  } = useTodos();

  const isLoadingTodos = loadingTodoIds.length > 0;

  useEffect(() => {
    if (!isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isCreating]);

  return (
    <header className="todoapp__header">
      {!isLoadingTodos && todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isCreating}
        />
      </form>
    </header>
  );
};

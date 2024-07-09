import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  visibleTodos: Todo[];
  handleChangeCheckbox: (id: number) => void;
  isEdited: boolean;
  editingTodoId: number | null;
  handleUpdateSubmit: (event: React.FormEvent, newTodo: Todo) => void;
  editRef: React.RefObject<HTMLInputElement>;
  currentTitle: string;
  handleUpdate: (newTodo: Todo) => void;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  handleDoubleClick: (id: number, title: string) => void;
  handleDeleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  handleChangeCheckbox,
  isEdited,
  editingTodoId,
  handleUpdateSubmit,
  editRef,
  currentTitle,
  handleUpdate,
  setCurrentTitle,
  handleDoubleClick,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeCheckbox={handleChangeCheckbox}
          isEdited={isEdited}
          editingTodoId={editingTodoId}
          handleUpdateSubmit={handleUpdateSubmit}
          editRef={editRef}
          currentTitle={currentTitle}
          handleUpdate={handleUpdate}
          setCurrentTitle={setCurrentTitle}
          handleDoubleClick={handleDoubleClick}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </section>
  );
};

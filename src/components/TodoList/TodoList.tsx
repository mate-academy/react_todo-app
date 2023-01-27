import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[];
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleDelet: (event: React.MouseEvent<HTMLButtonElement>) => void,
  changedTitleTodoId: number | null,
  handleEdit: (event: React.MouseEvent<HTMLLabelElement>) => void,
  newEditedTitle: string,
  handleInputChange:
  (event: React.ChangeEvent<HTMLInputElement>, param: string) => void,
  handleBlur: () => void,
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleToggle,
  handleDelet,
  changedTitleTodoId,
  handleEdit,
  newEditedTitle,
  handleInputChange,
  handleBlur,
  handleKeyDown,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              handleToggle={handleToggle}
              handleDelet={handleDelet}
              changedTitleTodoId={changedTitleTodoId}
              handleEdit={handleEdit}
              newEditedTitle={newEditedTitle}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              handleKeyDown={handleKeyDown}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>

    </ul>
  );
};

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';
import { TyChangeEvtInputElmt, TyKeybrEvtInputElmt } from '../../types/General';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(
  ({
    todo,
  }) => {
    // #region USE
    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState('');
    const {
      deleteTodo,
      updateTodo,
    } = useContext(TodosContext);
    const editingTitleInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (editingTitleInput.current) {
        editingTitleInput.current.focus();
      }
    }, [isEditing]);
    // #endregion

    const { id, title, completed } = todo;
    const resetEditingTitle = () => {
      setEditingTitle('');
      setIsEditing(false);
    };

    // #region HANDLER
    const handleTodoChecked = (
      event: TyChangeEvtInputElmt,
    ) => {
      updateTodo({
        ...todo,
        completed: event.target.checked,
      });
    };

    const handleTodoDelete = () => {
      deleteTodo(id);
    };

    const handleTodoTitleUpdate = (
      newTitle: Todo['title'],
    ): void => {
      const trimedTitle = newTitle.trim();

      if (trimedTitle) {
        updateTodo({
          ...todo,
          title: trimedTitle,
        });
      } else {
        deleteTodo(id);
      }
    };

    const handleEditingTitleStart = () => {
      setIsEditing(true);
    };

    const handleEditingTitlegOnBlur = () => {
      handleTodoTitleUpdate(editingTitle);
      resetEditingTitle();
    };

    const handleEditingTitleKeyUp = (event: TyKeybrEvtInputElmt) => {
      switch (event.key) {
        case 'Escape':
          resetEditingTitle();
          break;

        case 'Enter':
          handleTodoTitleUpdate(editingTitle);
          resetEditingTitle();
          break;

        default:
      }
    };
    // #endregion

    return (
      <li className={cn({
        completed,
        editing: isEditing,
      })}
      >
        {isEditing
          ? (
            <input
              type="text"
              ref={editingTitleInput}
              value={editingTitle}
              placeholder={title}
              className="edit"
              onChange={(event) => setEditingTitle(event.target.value)}
              onBlur={handleEditingTitlegOnBlur}
              onKeyUp={handleEditingTitleKeyUp}
            />
          )
          : (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                checked={completed}
                onChange={(event) => handleTodoChecked(event)}
              />

              <label onDoubleClick={handleEditingTitleStart}>
                {title}
              </label>

              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                aria-label="deleteTodo"
                onClick={handleTodoDelete}
              />
            </div>
          )}
      </li>
    );
  },
);

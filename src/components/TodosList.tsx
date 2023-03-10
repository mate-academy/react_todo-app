import classNames from 'classnames';
import { Dispatch, SetStateAction, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Todo } from '../types/Todo';
import { EditingForm } from './EditingForm';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  deleteTodoHandler: (value: number) => void,
  selectedTodoIds: number[],
  setSelectedTodoIds: Dispatch<SetStateAction<number[]>>,
  todoStatusChangeHandler: (id: number, data: boolean) => void,
  onDoubleClick: (id: number) => void;
  isEditing: boolean;
  editingHandler: (id: number, newData: string, oldData: string) => void;
  cancelEditingHandler: () => void;
};

export const TodosList: React.FC<Props> = ({
  todos,
  tempTodo,
  deleteTodoHandler,
  selectedTodoIds,
  setSelectedTodoIds,
  todoStatusChangeHandler,
  onDoubleClick,
  isEditing,
  editingHandler,
  cancelEditingHandler,
}) => {
  const deleteButtonHandler = (id: number) => {
    deleteTodoHandler(id);
    setSelectedTodoIds(prevIds => [...prevIds, id]);
  };

  const [todoNewTitle, setTodoNewTitle] = useState('');

  return (
    <section className="todoapp__main">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <div
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onClick={() => {
                    todoStatusChangeHandler(todo.id, !todo.completed);
                  }}
                />
              </label>

              {isEditing && selectedTodoIds.some(id => id === todo.id) ? (
                <EditingForm
                  todo={todo}
                  todoNewTitle={todoNewTitle}
                  setTodoNewTitle={setTodoNewTitle}
                  editingHandler={editingHandler}
                  cancelEditingHandler={cancelEditingHandler}
                />
              ) : (
                <>
                  <span
                    className="todo__title"
                    onDoubleClick={() => {
                      onDoubleClick(todo.id);
                      setTodoNewTitle(todo.title);
                    }}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    onClick={() => deleteButtonHandler(todo.id)}
                  >
                    ×
                  </button>

                  <div
                    className={
                      classNames(
                        'modal overlay',
                        {
                          'is-active': selectedTodoIds.some(
                            id => id === todo.id,
                          ),
                        },
                      )
                    }
                  >
                    <div
                      className="
                          modal-background
                          has-background-white-ter"
                    />
                    <div className="loader" />
                  </div>
                </>
              )}
            </div>
          </CSSTransition>
        ))}

        {!!tempTodo && (
          <CSSTransition
            timeout={300}
            classNames="temp-item"
          >
            <div
              className={
                classNames(
                  'todo',
                  { completed: tempTodo.completed },
                )
              }
            >
              <label className="todo__status-label">
                <input
                  type="checkbox"
                  className="todo__status"
                />
              </label>

              <span className="todo__title">{tempTodo.title}</span>

              <button
                type="button"
                className="todo__remove"
              >
                ×
              </button>

              <div className="modal overlay is-active">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};

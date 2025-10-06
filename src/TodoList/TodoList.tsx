import React, { useContext, useEffect, RefObject, useState, useRef, } from 'react';
import { Context, Todo } from '../Context/Context';
import classNames from 'classnames';

type Props = {
  inputRef: RefObject<HTMLInputElement>;

};

export const TodoList: React.FC<Props> = ({ inputRef}) => {
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [editedId, setEditedId] = useState<null | number>(null)
  const editedRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

    const deleted = todos.filter(todo => todo.id !== id);

    localStorage.setItem('todos', JSON.stringify(deleted));

    dispatch({ type: 'REMOVE_TODO', payload: id });

    inputRef.current?.focus();
  };

useEffect(() => {
  const savedTodos = localStorage.getItem('todos');
  const todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];


  if (!savedTodos) {
    localStorage.setItem('todos', JSON.stringify([]));
  }

  dispatch({ type: "SET_TODOS", payload: todos });
}, []);



  const handleSubmit = (id: number, e?: React.FormEvent<HTMLFormElement>) => {
  e?.preventDefault();

  if (!title.trim()) return;

  const updatedTodos = state.allTodos.map(todo =>
    todo.id === id ? { ...todo, title: title.trim() } : todo
  );

  // Сохраняем в localStorage
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  // Обновляем state через dispatch
  dispatch({ type: 'SET_TODOS', payload: updatedTodos });

  setTitle('');
  setEditedId(null);
};



 useEffect(() => {
  if (editedRef.current) {
    setTimeout(() => {
      editedRef.current?.focus();
    }, 0);
  }
}, [editedId]);


  const handleChangeTitle = (todo : Todo) => {

    setEditedId(todo.id);
    setTitle(todo.title);


  }




  const handleChangeStatusTodo = (id?: number) => {


    const updatedTodos = state.allTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    dispatch({ type: 'CHANGE_STATUS', payload: id });

    inputRef.current?.focus();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames({
            'todo completed': todo.completed,
            'todo item-enter-done': !todo.completed,
          })}
          key={todo.id}
        >
          <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
            <input
              id={`todo-${todo.id}`}
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
              onClick={() => handleChangeStatusTodo(todo.id)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          </label>

          { editedId ? (


          <form onSubmit={e => handleSubmit(todo.id, e)}>
              <input
                ref={editedRef}
                type="text"
                data-cy="TodoTitleField"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={() => handleSubmit(todo.id)}
              />
            </form>) : (


              <>

              <span data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleChangeTitle(todo)}
          >
            {todo.title}
              </span>



              <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
                </button>


                </>
                )



          }

          {/* Remove button appears only on hover */}








        </div>




      ))}
    </section>
  );
};

/*



  This todo is an active todo
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Not Completed Todo
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>

           This todo is being edited
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            /* This form is shown instead of the title and remove button
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          </div>

          /* This todo is in loadind state
          <div data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>

*/

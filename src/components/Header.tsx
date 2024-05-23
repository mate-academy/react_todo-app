import { useContext, useMemo, useState } from 'react';
import { ToDo } from '../types/types';
import { ToDoContext } from '../store/AppContext';
import cn from 'classnames';
import { createUniqueId } from '../helpers/createUniqueId';

export const Header: React.FC = () => {
  const dispatch = useContext(ToDoContext).dispatch;
  const { todoList } = useContext(ToDoContext).state;
  const initialTodo = {
    id: createUniqueId(),
    title: '',
    completed: false,
    isEditing: false,
  };
  const [newTodo, setNewTodo] = useState(initialTodo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
    });
  };

  const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      return;
    } else {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo(initialTodo);
    }
  };

  const allToDosCompleted = useMemo(
    () => todoList.every((todo: ToDo) => todo.completed),
    [todoList],
  );

  return (
    <header className="todoapp__header">
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_ALL' })}
        className={cn('todoapp__toggle-all', { active: allToDosCompleted })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleNewTodo}>
        <input
          autoFocus
          onChange={handleInputChange}
          data-cy="NewTodoField"
          defaultValue={newTodo.title}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

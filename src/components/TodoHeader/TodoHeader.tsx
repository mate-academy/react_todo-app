import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoListContext } from '../../context/TodoListContext';

import cn from 'classnames';

export const TodoHeader: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const {
    addTask: handlerAddTask,
    completeAllTasks,
    allCompletedTasks,
    todoList,
  } = useContext(TodoListContext);

  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handlerOnChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const reset = () => {
    setTodo('');
  };

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (todo.trim()) {
      handlerAddTask(todo);
    }

    reset();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todoList.length && (
        <button
          onClick={completeAllTasks}
          className={cn('todoapp__toggle-all', {
            active: allCompletedTasks,
          })}
          type="button"
          data-cy="ToggleAllButton"
        />
      )}
      {/* Add a todo on form submit */}
      <form onSubmit={handlerSubmit}>
        <input
          ref={newTodoField}
          value={todo}
          onChange={handlerOnChangeTodo}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

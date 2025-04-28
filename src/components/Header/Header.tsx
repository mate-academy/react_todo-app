import React, { useCallback, useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TodoContext } from '../../context/TodoContext';
import { TodoType } from '../../types/Todo';
import cn from 'classnames';

type Inputs = {
  title: string;
};

export const Header: React.FC = () => {
  const { todos, setTodos, setGeneralTodos, generalTodos } =
    useContext(TodoContext);

  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>();

  const addTodo = useCallback(
    (title: string) => {
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };

      setGeneralTodos([...generalTodos, newTodo]);
      setTodos([...todos, newTodo]);
    },
    [generalTodos, setGeneralTodos, setTodos, todos],
  );

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    data => {
      const newTitle = data.title.trim();

      if (newTitle.length === 0) {
        return;
      }

      addTodo(newTitle);
      reset();
    },
    [addTodo, reset],
  );

  const handleToggle = useCallback(() => {
    const allCompleted = generalTodos.every(todo => todo.completed);
    const updatedTodos = generalTodos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setGeneralTodos(updatedTodos);
  }, [setGeneralTodos, generalTodos]);

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const isToggleActive =
    generalTodos.every(todo => todo.completed) && generalTodos.length !== 0;

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isToggleActive,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToggle}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          {...register('title', { required: true })}
        />
      </form>
    </header>
  );
};

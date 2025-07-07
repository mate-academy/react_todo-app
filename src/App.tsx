/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
// import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, updateTodo, USER_ID } from './api/todos';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoFooter } from './components/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoInput } from './components/TodoInput';
import { filterTodos } from './utils/filterTodos';
import { useGlobalDispatch, useGlobalState } from './hooks/useGlobal';

export const App: React.FC = () => {
  // #region states
  const {
    todos,
    selectedFilterStatus,
    errorId,
    todosLoadingError,
    titleError,
    addError,
    deleteError,
    updateError,
  } = useGlobalState();
  const dispatch = useGlobalDispatch();
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const getTodosList = async () => {
      try {
        const todosList = await getTodos();

        dispatch({ type: 'setVisibleTodos', payload: todosList });
        dispatch({ type: 'setTodos', payload: todosList });
      } catch {
        dispatch({ type: 'setIsError', payload: true });
        dispatch({ type: 'setTodosLoadingError', payload: true });
        throw new Error();
      }
    };

    getTodosList();
  }, [dispatch]);

  useEffect(() => {
    if (
      todosLoadingError ||
      titleError ||
      addError ||
      deleteError ||
      updateError
    ) {
      dispatch({ type: 'setIsError', payload: true });
      dispatch({ type: 'incrementErrorId' });
    }
  }, [
    todosLoadingError,
    titleError,
    addError,
    deleteError,
    updateError,
    dispatch,
  ]);

  useEffect(() => {
    const filtered = filterTodos(todos, selectedFilterStatus);

    dispatch({ type: 'setVisibleTodos', payload: filtered });
  }, [todos, selectedFilterStatus, dispatch]);

  // #endregion

  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const checkError = () => {
    const errorsList = [];

    if (todosLoadingError) {
      errorsList.push('Unable to load todos');
    }

    if (titleError) {
      errorsList.push('Title should not be empty');
    }

    if (addError) {
      errorsList.push('Unable to add a todo');
    }

    if (deleteError) {
      errorsList.push('Unable to delete a todo');
    }

    if (updateError) {
      errorsList.push('Unable to update a todo');
    }

    return errorsList;
  };

  const handleCheckTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    dispatch({ type: 'setVisibleTodos', payload: updatedTodos });
    dispatch({ type: 'setTodos', payload: updatedTodos });
  };

  const removeTodo = async (todoToDelete: Todo) => {
    dispatch({ type: 'setActiveTodoId', payload: todoToDelete.id });
    try {
      await deleteTodo(todoToDelete.id);

      dispatch({
        type: 'setTodos',
        payload: todos.filter(todo => todo.id !== todoToDelete.id),
      });

      dispatch({
        type: 'setVisibleTodos',
        payload: todos.filter(todo => todo.id !== todoToDelete.id),
      });
    } catch {
      // dispatch({ type: 'setDeleteError', payload: false });
      // setTimeout(() => dispatch({ type: 'setDeleteError', payload: true }), 0);
      dispatch({ type: 'setDeleteError', payload: true });
      throw new Error();
    } finally {
      dispatch({ type: 'setActiveTodoId', payload: null });
    }
  };

  const handleUpdateTodo = async (
    updatedTodoId: number,
    updatedInfo: Omit<Todo, 'id' | 'userId'>,
  ) => {
    dispatch({ type: 'setActiveTodoId', payload: updatedTodoId });
    try {
      await updateTodo(updatedTodoId, updatedInfo);
      handleCheckTodo(updatedTodoId);
    } catch {
      // dispatch({ type: 'setUpdateError', payload: false });
      // setTimeout(() => dispatch({ type: 'setUpdateError', payload: true }), 0);
      dispatch({ type: 'setUpdateError', payload: true });
      throw new Error();
    } finally {
      dispatch({ type: 'setActiveTodoId', payload: null });
    }
  };

  const errors = checkError();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput />
        <TodoList
          handleCheckTodo={handleCheckTodo}
          removeTodo={removeTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
        {todos.length !== 0 && <TodoFooter removeTodo={removeTodo} />}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <ErrorNotification errors={errors} errorId={errorId} />
    </div>
  );
};

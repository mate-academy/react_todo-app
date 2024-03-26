import React, {
  useEffect, useMemo, useState,
} from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserWarning } from '../../UserWarning';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TodosList } from '../TodosList/TodosList';
import { Error } from '../Error/Error';
import { TodosContext } from '../../context';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import {
  addTodoAsync,
  deleteTodosAsync,
  initTodosAsync,
  Status,
  updateTodosAsync,
} from '../../app/features/todos';
import { clearError, setError } from '../../app/features/error';

export const USER_ID = 10326;

type Props = {
  currentUser: User,
};

export const TodoApp: React.FC<Props> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const { todos, status } = useAppSelector(state => state.todos);

  const todosCompleted = useMemo(() => todos
    .filter(todo => todo.completed), [todos]);
  const isActive = todosCompleted.length === todos.length;
  const completedTodosId = useMemo(() => {
    return todosCompleted.map(todo => todo.id);
  }, [todos]);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const [isClearCompletedTodos, setIsClearCompletedTodos] = useState(false);
  const [isToggleAll, setIsToggleAll] = useState(false);

  useEffect(() => {
    dispatch(initTodosAsync(currentUser.id));
  }, [currentUser.id]);

  // #region TodosHandlers
  const onAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    setSelectedTodoId(null);
    dispatch(clearError());

    if (!newTodoTitle.trim()) {
      dispatch(setError('Title can\'t be empty'));

      return;
    }

    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: '',
      completed: false,
    });

    await dispatch(addTodoAsync({
      userId: currentUser.id,
      title: newTodoTitle,
    }));

    setTempTodo(null);
    setNewTodoTitle('');
  };

  const onDelete = async (id: number) => {
    setSelectedTodoId(id);
    dispatch(clearError());
    await dispatch(deleteTodosAsync(id));
  };

  const onDeleteCompleted = async () => {
    setIsClearCompletedTodos(true);
    dispatch(clearError());

    try {
      await Promise.all(
        completedTodosId.map((id: number) => dispatch(deleteTodosAsync(id))),
      );
    } finally {
      setIsClearCompletedTodos(false);
    }
  };

  const onTitleChange = async (todoId: number, title: string) => {
    dispatch(clearError());
    setSelectedTodoId(todoId);

    const editedTodo = todos.find(todo => todo.id === todoId);

    if (editedTodo) {
      const { id } = editedTodo;

      await dispatch(updateTodosAsync({ id, changes: { title } }));
    }
  };

  const onToggleStatus = async (todoId: number, completed: boolean) => {
    dispatch(clearError());
    setSelectedTodoId(todoId);
    const editedTodo = todos.find(todo => todo.id === todoId);

    if (editedTodo) {
      const { id } = editedTodo;

      await dispatch(updateTodosAsync({ id, changes: { completed } }));
    }
  };

  const onToggleAll = async () => {
    dispatch(clearError());

    setIsToggleAll(true);
    try {
      await Promise.all(
        todos.map((todo) => {
          if (!todo.completed) {
            dispatch(updateTodosAsync(
              { id: todo.id, changes: { completed: true } },
            ));
          }

          if (completedTodosId.length === todos.length) {
            dispatch(updateTodosAsync(
              { id: todo.id, changes: { completed: !todo.completed } },
            ));
          }

          return todo;
        }),
      );
    } finally {
      setTimeout(() => {
        setIsToggleAll(false);
      }, 300);
    }
  };
  // #endregion

  const todosContextHandlers = {
    onDelete,
    onAdd,
    onTitleChange,
    onToggleStatus,
  };

  const filterTodos = (filter: Status) => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const visibleTodos = filterTodos(status);
  const hasTodos = todos.length > 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosContext.Provider value={todosContextHandlers}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
            isActive={isActive}
            onToggleAll={onToggleAll}
          />

          {hasTodos && (
            <>
              <TodosList
                visibleTodos={visibleTodos}
                tempTodo={tempTodo}
                selectedTodoId={selectedTodoId}
                completedTodosId={completedTodosId}
                isClearCompletedTodos={isClearCompletedTodos}
                isToggleAll={isToggleAll}
              />

              <Footer
                onDeleteCompleted={onDeleteCompleted}
              />
            </>
          )}
        </div>

        <Error />
      </div>
    </TodosContext.Provider>
  );
};

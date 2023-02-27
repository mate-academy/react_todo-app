import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  deleteTodoOnServer,
  getTodos,
  updateTodoOnServer,
} from '../../api/todos';
import { filterTodos } from '../../helpers/filterTodos';

import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';
import { TodoFooter } from '../TodoFooter';

import { useAuth } from '../../hooks/useAuth';

import { Todo } from '../../types/Todo';
import { OnChangeFunc } from '../../types/OnChangeFunc';
import { OnShowErrorFunc } from '../../types/OnErrorFunc';
import { FilterType } from '../../enums/FilterType';
import { ErrorType } from '../../enums/ErrorType';

type Props = {
  showError: OnShowErrorFunc;
  hideError: () => void;
};

export const TodoApp: React.FC<Props> = React.memo(
  ({
    showError,
    hideError,
  }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [tempTodoTitle, setTempTodoTitle] = useState('');
    const [isAllToggled, setIsAllToggled] = useState(false);
    const [isClearCompleted, setIsClearCompleted] = useState(false);

    const { filterType = FilterType.All } = useParams();

    const { id: userId, name: userName } = useAuth();

    useEffect(() => {
      getTodos(userId)
        .then((userTodos) => setTodos(userTodos))
        .catch(() => {
          showError(ErrorType.Download);
        });
    }, [userId]);

    const isTodosEmpty = todos.length === 0;

    const activeTodosNum = useMemo(
      () => filterTodos(todos, FilterType.Active).length,
      [todos],
    );
    const completedTodosNum = todos.length - activeTodosNum;

    const filteredTodos = useMemo(
      () => filterTodos(todos, filterType as FilterType),
      [filterType, todos],
    );

    const handleAddTodo = useCallback(
      (newTodo: Todo) => setTodos((oldTodos) => [...oldTodos, newTodo]),
      [],
    );

    const handleDeleteTodo = useCallback((todoId: number) => {
      setTodos((oldTodos) => {
        return oldTodos.filter(({ id }) => id !== todoId);
      });
    }, []);

    const handleChangeTodo: OnChangeFunc = useCallback(
      (todoId, propName, newPropValue) => {
        setTodos((oldTodos) => {
          return oldTodos.map((todo) => {
            if (todo.id !== todoId) {
              return todo;
            }

            return {
              ...todo,
              [propName]: newPropValue,
            };
          });
        });
      },
      [],
    );

    const handleToggleTodosStatus = useCallback(async () => {
      const todosTypeToToggle = activeTodosNum === 0
        ? FilterType.All
        : FilterType.Active;
      const todosToToggle = filterTodos(todos, todosTypeToToggle);

      setIsAllToggled(true);
      hideError();

      try {
        const todosIds = await Promise.all(
          todosToToggle.map(({ id, completed }) => {
            return updateTodoOnServer(id, { completed: !completed }).then(
              () => id,
            );
          }),
        );

        setTodos((oldTodos) => {
          return oldTodos.map((todo) => {
            if (!todosIds.includes(todo.id)) {
              return todo;
            }

            return {
              ...todo,
              completed: !todo.completed,
            };
          });
        });
      } catch {
        showError(ErrorType.Update);
      } finally {
        setIsAllToggled(false);
      }
    }, [todos]);

    const handleClearCompleted = useCallback(async () => {
      const completedTodos = filterTodos(todos, FilterType.Completed);

      setIsClearCompleted(true);
      hideError();

      try {
        const todosIds = await Promise.all(
          completedTodos.map(({ id }) => deleteTodoOnServer(id).then(() => id)),
        );

        setTodos((oldTodos) => {
          return oldTodos.filter(({ id }) => !todosIds.includes(id));
        });
      } catch {
        showError(ErrorType.Delete);
      } finally {
        setIsClearCompleted(false);
      }
    }, [todos]);

    return (
      <div className="todoapp">
        <h1 className="todoapp__title">{`${userName}'s todos`}</h1>

        <div className="todoapp__content">
          <TodoHeader
            isTodosEmpty={isTodosEmpty}
            activeTodosNum={activeTodosNum}
            showError={showError}
            hideError={hideError}
            showTempTodo={setTempTodoTitle}
            onAddNewTodo={handleAddTodo}
            onToggleTodosStatus={handleToggleTodosStatus}
          />

          <TodoList
            todos={filteredTodos}
            activeTodosNum={activeTodosNum}
            tempTodoTitle={tempTodoTitle}
            isClearCompleted={isClearCompleted}
            isAllToggled={isAllToggled}
            showError={showError}
            hideError={hideError}
            onDeleteTodo={handleDeleteTodo}
            onChangeTodo={handleChangeTodo}
          />

          {todos.length > 0 && (
            <TodoFooter
              activeTodosNum={activeTodosNum}
              completedTodosNum={completedTodosNum}
              onClearCompleted={handleClearCompleted}
            />
          )}
        </div>
      </div>
    );
  },
);

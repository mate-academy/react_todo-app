/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { Error } from '../types/Error';
import { TodoCondition } from '../types/TodoCondition';

import { filterTodos } from '../utils/filterTodos';
import {
  deleteTodo,
  getTodos,
  changeTodo,
} from '../api/todos';

import { Header } from '../components/Header';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { Footer } from '../components/Footer/Footer';
import { ErrorMessage } from '../components/ErrorMessage';
import { User } from '../types/User';

type Props = {
  user: User,
};

export const TodosPage: FC<Props> = ({ user }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const [errorType, setErrorType] = useState(Error.None);
  const [todoCondition, setTodoCondition]
    = useState<TodoCondition>(TodoCondition.neutral);
  const [procesingTodosId, setProcesingTodosId] = useState<number[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const USER_ID = user.id;

  const handleError = (err: Error) => {
    if (err !== Error.None) {
      setTimeout(() => setErrorType(Error.None), 3000);
    }

    setErrorType(err);
  };

  useEffect(() => {
    if (USER_ID) {
      getTodos(USER_ID)
        .then(result => {
          setTodos(result);
        })
        .catch(() => handleError(Error.Load));
    }
  }, [USER_ID]);

  const todosStatus = useMemo(() => {
    return {
      isActive: todos.some(todo => todo.completed === false),
      isCompleted: todos.some(todo => todo.completed === true),
    };
  }, [todos]);

  const handleDeleteTodo = (todoId: number) => {
    setTodoCondition(TodoCondition.deleting);
    setProcesingTodosId([todoId]);
    deleteTodo(todoId)
      .then(() => setTodos(prev => prev.filter(({ id }) => id !== todoId)))
      .catch(() => handleError(Error.Delete))
      .finally(() => setTodoCondition(TodoCondition.neutral));
  };

  const clearCompleted = () => {
    setTodoCondition(TodoCondition.deleting);

    todos?.forEach(todo => {
      if (todo.completed) {
        setProcesingTodosId((state) => [...state, todo.id]);
        deleteTodo(todo.id)
          .then(() => setTodos(prev => prev.filter(({ id }) => id !== todo.id)))
          .catch(() => handleError(Error.Delete))
          .finally(() => setTodoCondition(TodoCondition.neutral));
      }
    });
  };

  const toggleTodo = (curentTodo: Todo, status: boolean | undefined) => {
    setTodoCondition(TodoCondition.saving);
    setProcesingTodosId([curentTodo.id]);

    const copyTodos = [...todos];
    const indexCurTodo = copyTodos.findIndex(({ id }) => id === curentTodo.id);
    const newStatus: boolean = status || !curentTodo.completed;

    copyTodos[indexCurTodo].completed = newStatus;

    changeTodo(curentTodo.id, { completed: newStatus })
      .then(() => {
        setTodos(copyTodos);
      })
      .catch(() => handleError(Error.Update))
      .finally(() => {
        setProcesingTodosId([]);
        setTodoCondition(TodoCondition.neutral);
      });
  };

  const toggleAllTodos = () => {
    todos.forEach(todo => {
      if (todosStatus.isActive !== todo.completed) {
        toggleTodo(todo, todosStatus.isActive);
      }
    });
  };

  const handleSubmitEditing = (todoId: number, newTitle: string) => {
    setProcesingTodosId([todoId]);
    setTodoCondition(TodoCondition.saving);

    changeTodo(todoId, { title: newTitle })
      .then(() => setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      })))
      .catch(() => Error.Update)
      .finally(() => {
        setProcesingTodosId([]);
        setTodoCondition(TodoCondition.neutral);
      });
  };

  const filteredTodos = todos ? filterTodos(todos, filterType) : [];

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__user">
        {`Hello ${user.name.toUpperCase()} here is yours todos:`}
      </div>

      <div className="todoapp__content">

        <Header
          containsActive={todosStatus.isActive}
          handleError={handleError}
          setTodoCondition={setTodoCondition}
          onTrickTempTodo={setTempTodo}
          setTodos={setTodos}
          toggleAllTodos={toggleAllTodos}
          USER_ID={USER_ID}
        />

        {filteredTodos && (
          <>
            <section className="todoapp__main">
              <TodoList
                todos={filteredTodos}
                onDeleteTodo={handleDeleteTodo}
                todoCondition={todoCondition}
                procesingTodosId={procesingTodosId}
                toggleTodo={toggleTodo}
                handleSubmitEditing={handleSubmitEditing}
              />

              {tempTodo && (
                <TodoItem
                  todo={tempTodo}
                  todoCondition={todoCondition}
                />
              )}
            </section>
          </>
        )}

        {!!todos.length && (
          <Footer
            onFilter={setFilterType}
            filterType={filterType}
            containsCompleted={todosStatus.isCompleted}
            onClearCompleted={clearCompleted}
            itemsLeft={todos
              .filter(({ completed }) => !completed).length}
          />
        )}
      </div>

      {
        errorType !== Error.None && (
          <ErrorMessage errorType={errorType} handleError={setErrorType} />
        )
      }
    </div>
  );
};

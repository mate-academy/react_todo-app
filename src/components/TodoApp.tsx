import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { UserWarning } from '../UserWarning';
import { Todo } from '../types/Todo';
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo,
} from '../api/todos';
import { ErrorTypes } from '../types/ErrorTypes';
import {
  Header,
  TodosList,
  Footer,
  ErrorNotifications,
} from './index';

const USER_ID = 6335;

export const TodoApp: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorTypes | null>(null);
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const { pathname } = useLocation();

  const pushError = (erroType: ErrorTypes) => {
    setError(erroType);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setAllTodos)
      .catch(() => pushError(ErrorTypes.Load));
  }, []);

  const filterHandler = (array: Todo[], filterType: string) => {
    localStorage.setItem('filter', pathname);

    switch (filterType) {
      case '/active':
        return array.filter(item => !item.completed);
      case '/completed':
        return array.filter(item => item.completed);
      default:
        return array;
    }
  };

  const addTodoHandler = useCallback(() => {
    if (!title.trim()) {
      pushError(ErrorTypes.Empty);

      return;
    }

    setIsAdding(true);

    const todo = {
      title,
      userId: USER_ID,
      completed: false,
    };

    setTempTodo({
      id: 0,
      title,
      userId: USER_ID,
      completed: false,
    });

    addTodo(todo)
      .then(result => {
        setAllTodos(
          prevTodos => [...prevTodos, result],
        );
        setTempTodo(null);
      })
      .catch(() => {
        setError(ErrorTypes.Add);
      })
      .finally(() => {
        setIsAdding(false);
        setTitle('');
        setTempTodo(null);
      });
  }, [title]);

  const deleteTodoHandler = useCallback((id: number) => {
    deleteTodo(id)
      .then(() => setAllTodos(
        prevAllTodos => prevAllTodos.filter(prevTodo => prevTodo.id !== id),
      ))
      .catch(() => pushError(ErrorTypes.Delete))
      .finally(() => setSelectedTodoIds([]));
  }, []);

  const activeTodos = useMemo(
    () => allTodos.filter(todo => !todo.completed), [allTodos],
  );
  const completedTodos = useMemo(
    () => allTodos.filter(todo => todo.completed), [allTodos],
  );
  const visibleTodos = useMemo(
    () => filterHandler(allTodos, pathname), [allTodos, pathname],
  );

  const deleteAllCompletedHandler = useCallback(() => {
    completedTodos.map(
      completedTodo => deleteTodoHandler(completedTodo.id),
    );
  }, [completedTodos]);

  const todoStatusChangeHandler = useCallback(
    (id: number, isCompeled: boolean) => {
      setSelectedTodoIds(prev => [...prev, id]);

      completeTodo(id, isCompeled)
        .then(() => setAllTodos(prevTodos => {
          const todosCopy = JSON.parse(JSON.stringify(prevTodos));

          return todosCopy.map(
            (todo: Todo) => (
              todo.id === id ? { ...todo, completed: isCompeled } : todo
            ),
          );
        }))
        .catch(() => pushError(ErrorTypes.Update))
        .finally(() => setSelectedTodoIds([]));
    }, [],
  );

  const completeAll = useCallback(() => {
    Promise.all(allTodos.map(
      todo => todoStatusChangeHandler(
        todo.id, !allTodos.every(todoItem => todoItem.completed),
      ),
    ));
  }, [allTodos]);

  const doubleClickHandler = useCallback((id: number) => {
    setSelectedTodoIds([id]);
    setIsEditing(true);
  }, []);

  const cancelEditingHandler = useCallback(() => {
    setIsEditing(false);
    setSelectedTodoIds([]);
  }, []);

  const editingHandler = useCallback(
    (id: number, newData: string, oldData: string) => {
      setIsEditing(false);

      if (!newData.trim()) {
        deleteTodoHandler(id);

        return;
      }

      if (oldData === newData) {
        cancelEditingHandler();

        return;
      }

      editTodo(id, newData)
        .then(() => setAllTodos(prevTodos => {
          const todosCopy = JSON.parse(JSON.stringify(prevTodos));

          return todosCopy.map(
            (todo: Todo) => (
              todo.id === id ? { ...todo, title: newData } : todo
            ),
          );
        }))
        .catch(() => setError(ErrorTypes.Update))
        .finally(() => {
          setSelectedTodoIds(prev => prev.filter(todoId => todoId !== id));
        });
    }, [],
  );

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          title={title}
          setTitle={setTitle}
          allTodos={allTodos}
          activeTodos={activeTodos}
          addTodoHandler={addTodoHandler}
          isAdding={isAdding}
          completeAll={completeAll}
        />
        {!!allTodos.length && (
          <>
            <TodosList
              todos={visibleTodos}
              tempTodo={tempTodo}
              deleteTodoHandler={deleteTodoHandler}
              selectedTodoIds={selectedTodoIds}
              setSelectedTodoIds={setSelectedTodoIds}
              todoStatusChangeHandler={todoStatusChangeHandler}
              onDoubleClick={doubleClickHandler}
              isEditing={isEditing}
              editingHandler={editingHandler}
              cancelEditingHandler={cancelEditingHandler}
            />

            <Footer
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              deleteAllCompletedHandler={deleteAllCompletedHandler}
              pathname={pathname}
            />
          </>
        )}
      </div>

      <ErrorNotifications
        error={error}
        setError={setError}
      />
    </div>
  );
};

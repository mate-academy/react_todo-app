import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  addNewTodo,
  changeTitles,
  checkboxTodo,
  deleteTodo,
  getTodos,
} from './api/todos';
import {
  Footer,
  Header,
  Notification,
  TodoList,
} from './components';
import { FilterOption } from './types/FilterOption';
import { Todo } from './types/Todo';
import { NotificationType } from './types/NotificationType';
import { getUserById } from './api/user';
import { User } from './types/User';
import { Loader } from './components/Loader';

const userId = 4817;

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [noUserError, setNoUserError] = useState<boolean>(false);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notification, setNotification]
    = useState<NotificationType>(NotificationType.null);
  const [errorText, setErrorText] = useState<string>('');
  const [todoAction, setTodoAction] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newTodoName, setNewTodoName] = useState<string>('');
  const [editingTodo, setEditingTodo] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const getUser = await getUserById(userId);

        setUser(getUser);
      } catch {
        setNoUserError(true);
      }

      return loadUser;
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const loadedTodos = await getTodos(user.id);

          setTodos(loadedTodos);
        }
      } catch {
        setNotification(NotificationType.error);
        setErrorText('load');
      }
    };

    loadData();

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [user]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isAdding]);

  const closeNotification = () => {
    setNotification(NotificationType.null);
    setErrorText('');
  };

  const loadInfo = async () => {
    if (user) {
      const loadTodos = await getTodos(user.id);

      setIsAdding(false);
      setTodos(loadTodos);
      setTodoAction([]);
    }
  };

  const addTodo = async (todoTitle: string) => {
    if (!user) {
      return null;
    }

    if (!todoTitle) {
      setErrorText('empty');

      return setNotification(NotificationType.error);
    }

    setNewTodoName(todoTitle);
    setIsAdding(true);
    const numbers: Todo[] = await getTodos(user.id);
    let id;

    if (numbers.length === 0) {
      id = user.id;
    } else {
      id = numbers[numbers.length - 1].id + 1;
    }

    closeNotification();
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    try {
      const newTodo: Todo = {
        id,
        userId: user.id,
        completed: false,
        title: todoTitle,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const addToList = await addNewTodo(newTodo);

      loadInfo();

      return addToList;
    } catch {
      setTodoAction([]);
      setIsAdding(false);
      setErrorText('add');

      return setNotification(NotificationType.error);
    }
  };

  const removeTodo = async (todoId: number) => {
    closeNotification();
    try {
      const deleteTodos = await deleteTodo(todoId);

      loadInfo();

      return deleteTodos;
    } catch {
      setTodoAction([]);
      setErrorText('delete');

      return setNotification(NotificationType.error);
    }
  };

  const removeOneTodo = (todoId: number) => {
    setTodoAction([todoId]);
    removeTodo(todoId);
  };

  const deleteCompleted = () => {
    setTodoAction(todos.filter(todo => todo.completed).map(todo => todo.id));
    const deleteCompleteTodos
      = todos.filter(todo => todo.completed).forEach(todo => {
        removeTodo(todo.id);
      });

    return deleteCompleteTodos;
  };

  const filterTodos = () => {
    closeNotification();
    switch (location.pathname) {
      case FilterOption.active:
        return todos.filter(todo => !todo.completed);

      case FilterOption.completed:
        return todos.filter(todo => todo.completed);

      case FilterOption.all:
        return todos;

      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(filterTodos, [todos, location.pathname]);

  const changeStatus = async (todoId: number, completed: boolean) => {
    closeNotification();
    try {
      const checkTodo = await checkboxTodo(todoId, completed);

      loadInfo();

      return checkTodo;
    } catch {
      setTodoAction([]);
      setErrorText('update');

      return setNotification(NotificationType.error);
    }
  };

  const changeOneTodoStatus = (todoId: number, completed: boolean) => {
    setTodoAction([todoId]);
    changeStatus(todoId, completed);
  };

  const toggleAll = () => {
    const statusDone = todos.every(todo => todo.completed);
    let toggleAllTodos;

    if (statusDone) {
      setTodoAction(todos.map(todo => todo.id));
      toggleAllTodos = todos.forEach(todo => {
        changeStatus(todo.id, false);
      });

      return toggleAllTodos;
    }

    setTodoAction(todos.filter(todo => !todo.completed).map(todo => todo.id));
    toggleAllTodos
      = todos.filter(todo => !todo.completed).forEach(todo => {
        changeStatus(todo.id, true);
      });

    return toggleAllTodos;
  };

  const editTodo = (todoId: number, todoName: string) => {
    setEditingTodo(todoId);
    setNewTodoName(todoName);
  };

  const changeTitle = async (todoId: number, title: string) => {
    try {
      const changeName = await changeTitles(todoId, title);

      setTodoAction([todoId]);
      loadInfo();

      return changeName;
    } catch {
      setTodoAction([]);
      setErrorText('update');

      return setNotification(NotificationType.error);
    }
  };

  if (notification !== NotificationType.null) {
    setTimeout(closeNotification, 3000);
  }

  if (noUserError) {
    return (
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        No user!
      </div>
    );
  }

  return (
    <div className="todoapp">
      {!user
        ? <Loader />
        : (
          <>
            <h1 className="todoapp__title">{`${user.name}'s todos`}</h1>

            <div className="todoapp__content">
              <Header
                newTodoField={newTodoField}
                todos={todos}
                toNameTodo={addTodo}
                isAdding={isAdding}
                toggleAll={toggleAll}
              />

              <TodoList
                todos={filteredTodos}
                removeOneTodo={removeOneTodo}
                todoAction={todoAction}
                isAdding={isAdding}
                newTodoName={newTodoName}
                user={user}
                changeOneTodoStatus={changeOneTodoStatus}
                editTodo={editTodo}
                editingTodo={editingTodo}
                changeTitle={changeTitle}
              />

              <Footer
                todos={todos}
                deleteCompleted={deleteCompleted}
                isAdding={isAdding}
              />
            </div>
          </>
        )}

      <Notification
        notification={notification}
        errorText={errorText}
        closeNotification={closeNotification}
      />
    </div>
  );
};

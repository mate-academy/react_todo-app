import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

enum Status {
  all = '#/',
  active = '#/active',
  completed = '#/completed',
  allCompleted = 'completed',
  notCompleted = 'not completed',
}

type Props = {
  children: React.ReactNode;
};

type TodoContextType = {
  todosCompleted: Todo[];
  filteredTodos: Todo[];
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  setTodoComplete: (todo: Todo, isComplete: boolean) => void;
  filterList: (action: string) => void;
  clearTodos: () => void;
  clearTodo: (id: number) => void;
};

export const TodosContext = createContext<TodoContextType>({
  todosCompleted: [],
  filteredTodos: [],
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  setTodoComplete: () => {},
  filterList: () => {},
  clearTodos: () => {},
  clearTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filteredTodos, setFilter] = useState(todos);
  const todosCompleted = filteredTodos.filter(todo => todo.completed);
  const filterList = useCallback(
    (sortBy: string): Todo[] | void => {
      switch (sortBy) {
        case Status.all: {
          setFilter(todos);
          break;
        }

        case Status.active: {
          const active = [...todos].filter(todo => !todo.completed);

          setFilter(active);

          break;
        }

        case Status.completed: {
          const completed = [...todos].filter(todo => todo.completed);

          setFilter(completed);

          break;
        }

        case Status.allCompleted: {
          const onToggle = [...todos].map(todo => ({
            ...todo,
            completed: true,
          }));

          setTodos(onToggle);

          break;
        }

        case Status.notCompleted: {
          const onToggle = [...todos].map(todo => ({
            ...todo,
            completed: false,
          }));

          setTodos(onToggle);
          break;
        }

        default:
          return todos;
      }
    },
    [todos],
  );

  const addTodo = useCallback(
    (title: string) => {
      const newTodo = {
        id: Date.now(),
        title: title,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    },
    [todos],
  );

  const clearTodos = useCallback(
    () =>
      setTodos(prevTodos => {
        const filter = prevTodos.filter(todo => !todo.completed);

        return filter;
      }),
    [],
  );

  const clearTodo = useCallback(
    (todoId: number) => {
      const index = todos.findIndex(todo => todo.id === todoId);

      setTodos(prevTodos => {
        const newTodosList = [...prevTodos];

        newTodosList.splice(index, 1);

        return newTodosList;
      });
    },
    [todos],
  );

  const setTodoComplete = useCallback(
    (todo: Todo, isComplete: boolean) => {
      const newTodos = todos.map(t => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: isComplete,
          };
        } else {
          return t;
        }
      });

      setTodos(newTodos);
    },
    [todos],
  );

  const todosTools = useMemo(
    () => ({
      todosCompleted,
      filteredTodos,
      todos,
      setTodos,
      addTodo,
      setTodoComplete,
      filterList,
      clearTodos,
      clearTodo,
    }),
    [
      todosCompleted,
      todos,
      addTodo,
      setTodoComplete,
      filterList,
      filteredTodos,
      setTodos,
      clearTodos,
      clearTodo,
    ],
  );

  useEffect(() => {
    setFilter([...todos]);
  }, [todos]);

  return (
    <TodosContext.Provider value={todosTools}>{children}</TodosContext.Provider>
  );
};

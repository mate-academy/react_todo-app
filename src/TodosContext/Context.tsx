import React, { createContext, useEffect, useState } from 'react';
import { FilterOptions, Todo } from '../type';

export const TodosContext = createContext<{
  todos: Todo[] | [];
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | []>>;
}>({
  todos: [],
  setTodos: () => {},
});
export const NewTodoContext = createContext<{
  addTodo: Todo | null;
  setAddTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}>({
  addTodo: null,
  setAddTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosFilterContext = createContext<{
  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
}>({
  filter: 'all',
  setFilter: () => {},
});

export const VisibleTodosContext = createContext<{
  visibleTodos: Todo[] | [];
}>({
  visibleTodos: [],
});

export const DeletingIdsContext = createContext<{
  deletingIds: number[] | [];
  setDeletingIds: React.Dispatch<React.SetStateAction<number[] | []>>;
}>({
  deletingIds: [],
  setDeletingIds: () => {},
});

export const ClickedClearCompletedContext = createContext<{
  setClickedClearCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setClickedClearCompleted: () => {},
});

export const ToggleTodosContext = createContext<{
  setToggleTodo: (todo: Todo) => void;
}>({
  setToggleTodo: () => {},
});

export const ClickedToggleAllContext = createContext<{
  setClickToggleAll: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setClickToggleAll: () => {},
});

export const DoubleClickEditContext = createContext<{
  editingTodo: Todo | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}>({
  editingTodo: null,
  setEditingTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterOptions>('all');
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [clickedClearCompleted, setClickedClearCompleted] =
    useState<boolean>(false);
  const [toggleTodo, setToggleTodo] = useState<Todo | null>(null);
  const [clickToggleAll, setClickToggleAll] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  function saveTodos(arr: Todo[]) {
    if (arr.length === 0) {
      localStorage.removeItem('todos');
    } else {
      localStorage.setItem('todos', JSON.stringify(arr));
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  function saveTodo(todo: Todo[]) {
    setTodos(prev => {
      const updatedTodos = [...prev, ...todo];

      saveTodos(updatedTodos);

      return updatedTodos;
    });
  }

  useEffect(() => {
    if (addTodo) {
      saveTodo([addTodo]);
      setAddTodo(null);
    }
  }, [addTodo]);

  function deleteTodo() {
    setTodos(prev => {
      const updatedTodos = prev.filter(todo => !deletingIds.includes(todo.id));

      saveTodos(updatedTodos);

      return updatedTodos;
    });
    setDeletingIds([]);
  }

  useEffect(() => {
    if (deletingIds.length > 0) {
      deleteTodo();
    }
  }, [deletingIds]);

  function clearCompleted() {
    setTodos(prev => {
      const updatedTodos = prev.filter(todo => !todo.completed);

      saveTodos(updatedTodos);

      return updatedTodos;
    });
    setClickedClearCompleted(false);
  }

  useEffect(() => {
    if (clickedClearCompleted) {
      clearCompleted();
    }
  }, [clickedClearCompleted]);

  function toggleTodoStatus(todo: Todo) {
    setTodos(prev => {
      const index = prev.findIndex(t => t.id === todo.id);
      const updatedTodos = [...prev];

      updatedTodos[index] = todo;
      saveTodos(updatedTodos);

      return updatedTodos;
    });
    setToggleTodo(null);
  }

  useEffect(() => {
    if (toggleTodo) {
      toggleTodoStatus(toggleTodo);
    }
  }, [toggleTodo]);

  function toggleAll() {
    setTodos(prev => {
      const allCompleted = prev.every(todo => todo.completed);
      const updatedTodos = prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

      saveTodos(updatedTodos);

      return updatedTodos;
    });
    setClickToggleAll(false);
  }

  useEffect(() => {
    if (clickToggleAll) {
      toggleAll();
    }
  }, [clickToggleAll]);

  function editTodo(todo: Todo) {
    setTodos(prev => {
      const updatedTodos = prev.map(t => {
        return t.id === todo?.id ? todo : t;
      });

      saveTodos(updatedTodos);

      return updatedTodos;
    });
    setEditingTodo(null);
  }

  useEffect(() => {
    if (editingTodo) {
      editTodo(editingTodo);
    }
  }, [editingTodo]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <NewTodoContext.Provider value={{ addTodo, setAddTodo }}>
        <TodosFilterContext.Provider value={{ filter, setFilter }}>
          <VisibleTodosContext.Provider value={{ visibleTodos }}>
            <DeletingIdsContext.Provider
              value={{ deletingIds, setDeletingIds }}
            >
              <ClickedClearCompletedContext.Provider
                value={{ setClickedClearCompleted }}
              >
                <ToggleTodosContext.Provider
                  value={{ setToggleTodo: setToggleTodo }}
                >
                  <ClickedToggleAllContext.Provider
                    value={{ setClickToggleAll }}
                  >
                    <DoubleClickEditContext.Provider
                      value={{
                        editingTodo: editingTodo,
                        setEditingTodo: setEditingTodo,
                      }}
                    >
                      {children}
                    </DoubleClickEditContext.Provider>
                  </ClickedToggleAllContext.Provider>
                </ToggleTodosContext.Provider>
              </ClickedClearCompletedContext.Provider>
            </DeletingIdsContext.Provider>
          </VisibleTodosContext.Provider>
        </TodosFilterContext.Provider>
      </NewTodoContext.Provider>
    </TodosContext.Provider>
  );
};

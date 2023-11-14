/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodoFilter';

enum Status {
  all = '#/',
  active = '#/active',
  completed = '#/completed',
}

function filterTodos(todos: Todo[], status: string):Todo[] {
  return todos.filter(todo => {
    if (status === Status.active) {
      return !todo.completed;
    }

    if (status === Status.completed) {
      return todo.completed;
    }

    return true;
  });
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [statusButton, setStatusButton] = useState('#/');
  const [isEdited, setIsEdited] = useState('');

  const visibleTodos = useMemo(() => filterTodos(todoList, statusButton),
    [todoList, statusButton]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  const changeNameAction
    = (
      event: React.KeyboardEvent<HTMLInputElement>,
      currTodo: Todo,
      currValue: string,
    ) => {
      if (event.key === 'Enter') {
        if (currValue.trim() !== '') {
          const changeable = [...todoList]
            .map(changeableTodo => {
              if (currTodo.id === changeableTodo.id) {
                return {
                  ...changeableTodo,
                  title: currValue,
                };
              }

              return changeableTodo;
            });

          setTodoList(changeable);
          setIsEdited('');
        }

        if (currValue.trim() === '') {
          const changeable = [...todoList]
            .filter(changeableTodo => currTodo.id !== changeableTodo.id);

          setTodoList(changeable);
          setIsEdited('');
        }
      }

      if (event.key === 'Escape') {
        setIsEdited('');
      }
    };

  const handleSetTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const todoLeftCount = () => {
    let count = 0;

    todoList.forEach(currentTodo => {
      if (!currentTodo.completed) {
        count += 1;
      }
    });

    return count;
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: todo,
      completed: false,
    };

    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    setTodo('');
  };

  const handleDeleteTodo = (todoId: number) => {
    setTodoList(currentTodoList => {
      return currentTodoList.filter(todoItem => todoId !== todoItem.id);
    });
  };

  const handleChangeCheckbox = (todoId: number) => {
    setTodoList(currentTodoList => {
      return currentTodoList
        .map(todoItem => {
          return (todoId === todoItem.id)
            ? {
              ...todoItem,
              completed: !todoItem.completed,
            }
            : todoItem;
        });
    });
  };

  const handleClearCompleted = () => {
    setTodoList(currentTodoList => {
      return currentTodoList.filter(currTodo => !currTodo.completed);
    });
  };

  const statusChange = (newStatus: string) => {
    setStatusButton(newStatus);
  };

  const isAnyCompleted = todoList.some(currTodo => currTodo.completed === true);

  const toggleAllAction
    = () => {
      const isAllCompleted = todoList
        .every(currTodo => currTodo.completed === true);

      if (isAllCompleted) {
        setTodoList(todoList.map(currentTodo => ({
          ...currentTodo,
          completed: false,
        })));
      }

      if (!isAllCompleted) {
        setTodoList(todoList.map(currentTodo => ({
          ...currentTodo,
          completed: true,
        })));
      }
    };

  const handleChangeTodoTitle = (event: string) => {
    setIsEdited(event);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={addTodo}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todo}
            onChange={handleSetTodo}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAllAction}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          onChange={handleChangeCheckbox}
          onDelete={handleDeleteTodo}
          edit={isEdited}
          onEdit={handleChangeTodoTitle}
          onChangeName={changeNameAction}
        />
      </section>

      {Boolean(todoList.length) && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todoLeftCount()} items left`}
          </span>

          <TodosFilter
            status={statusButton}
            onChangeStatus={statusChange}
          />
          {isAnyCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

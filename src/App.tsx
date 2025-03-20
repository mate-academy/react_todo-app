/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React, { useState, useEffect, useRef } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  // const [originalTodoList, setOriginalTodoList] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editedId, setEditedId] = useState<null | number>(null);
  const [editedTitle, setEditedTitle] = useState('');

  // original todoList for filter
  const originalTodoList = useRef<Todo[]>([]);

  // ref for edited input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ref for main title input
  const titleRef = useRef<HTMLInputElement>(null);

  const number = originalTodoList.current.filter(
    task => !task.completed,
  ).length;

  // console.log(originalTodoList);

  const handleSubmit = (
    todoTitle: string,
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const newItem = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodoList(currentList => {
      return [
        ...currentList,
        {
          ...newItem,
        },
      ];
    });

    const updatedTodoList = [...todoList, newItem];

    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    setTitle('');
    originalTodoList.current = updatedTodoList;
  };

  const handleFilter = (filter: Filter) => {
    switch (filter) {
      case 'all':
        setTodoList(originalTodoList.current);
        break;
      case 'active':
        setTodoList(originalTodoList.current.filter(task => !task.completed));
        break;
      case 'completed':
        setTodoList(originalTodoList.current.filter(task => task.completed));
        break;
      default:
        break;
    }
  };

  // #region clearAll button
  // const handleClearAll = () => {
  //   setTodoList([]);
  //   originalTodoList.current = [];
  //   setTitle('');
  //   localStorage.setItem('todoList', JSON.stringify([]));
  // };
  // #endregion

  const handleClearCompleted = () => {
    setTodoList(currentList => {
      const updatedTodo = currentList.filter(task => !task.completed);

      localStorage.setItem('todoList', JSON.stringify(updatedTodo));
      originalTodoList.current = updatedTodo;

      return updatedTodo;
    });
  };

  const toggleCompleted = (taskId: number) => {
    setTodoList((currentList: Todo[]) => {
      const updatedTodo = currentList.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      });

      originalTodoList.current = [...updatedTodo];

      return updatedTodo;
    });
  };

  const handleToggleAll = (todoToUpdate: Todo[]) => {
    const filteredList = todoToUpdate.filter(task => task.completed);

    if (
      filteredList.length === 0 ||
      filteredList.length < todoToUpdate.length
    ) {
      setTodoList(currentList => {
        const updatedList = currentList.map(task => {
          return {
            ...task,
            completed: true,
          };
        });

        originalTodoList.current = updatedList;
        localStorage.setItem('todoList', JSON.stringify(updatedList));

        return updatedList;
      });

      return;
    }

    setTodoList(currentList => {
      const updatedList = currentList.map(task => {
        return {
          ...task,
          completed: false,
        };
      });

      originalTodoList.current = updatedList;
      localStorage.setItem('todoList', JSON.stringify(updatedList));

      return updatedList;
    });
  };

  const handleRemoveItem = (listToUpdate: Todo[], item: Todo) => {
    const index = listToUpdate.findIndex(task => task.id === item.id);

    const updatedList = [...listToUpdate];

    updatedList.splice(index, 1);

    setTodoList(updatedList);
    originalTodoList.current = updatedList;
    localStorage.setItem('todoList', JSON.stringify(updatedList));

    // console.log(item, index, updatedList);
  };

  const handleDoubleClick = (task: Todo) => {
    setEditedId(task.id);
    setEditedTitle(task.title);
  };

  const handleEditedSubmit = (task: Todo) => {
    if (editedTitle.length) {
      const updatedList = todoList.map(todo => {
        if (todo.id === task.id) {
          return {
            ...todo,
            title: editedTitle,
          };
        }

        return todo;
      });

      setTodoList(updatedList);
      originalTodoList.current = updatedList;
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      // inputRef.current?.blur();
      setEditedId(null);
      setEditedTitle('');

      return;
    }

    const updatedList = [...todoList];
    const index = todoList.findIndex(todo => todo.id === task.id);

    updatedList.splice(index, 1);

    setTodoList(updatedList);
    originalTodoList.current = updatedList;
    localStorage.setItem('todoList', JSON.stringify(updatedList));

    setEditedId(null);
    setEditedTitle('');
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todoList');

    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);

      setTodoList(parsedTodos);
      originalTodoList.current = parsedTodos;
    }
  }, []);

  useEffect(() => {
    if (editedId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editedId]);

  useEffect(() => {
    if (editedId === null && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editedId]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: !number && todoList.length !== 0,
            })}
            data-cy="ToggleAllButton"
            onClick={() => handleToggleAll(todoList)}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={event => handleSubmit(title, event)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={event => setTitle(event.target.value)}
              ref={titleRef}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todoList.length > 0 &&
            todoList.map(task => (
              <div
                data-cy="Todo"
                className={classNames('todo', {
                  completed: task.completed,
                })}
                key={task.id}
              >
                <label
                  className="todo__status-label"
                  htmlFor={`todo-${task.id}`}
                >
                  <input
                    id={`todo-${task.id}`}
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    onClick={() => toggleCompleted(task.id)}
                    checked={task.completed}
                    aria-label="Toggle task status"
                  />
                </label>

                {editedId === task.id ? (
                  <form onSubmit={() => handleEditedSubmit(task)}>
                    <input
                      ref={inputRef}
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editedTitle}
                      onChange={event => setEditedTitle(event.target.value)}
                      // onBlur={() => {
                      //   if (editedTitle.length) {
                      //     const updatedList = todoList.map(todo => {
                      //       if (todo.id === task.id) {
                      //         return {
                      //           ...todo,
                      //           title: editedTitle,
                      //         };
                      //       }

                      //       return todo;
                      //     });

                      //     setTodoList(updatedList);
                      //     originalTodoList.current = updatedList;
                      //     localStorage.setItem(
                      //       'todoList',
                      //       JSON.stringify(updatedList),
                      //     );

                      //     return;
                      //   }

                      //   const updatedList = [...todoList];
                      //   const index = todoList.findIndex(
                      //     todo => todo.id === task.id,
                      //   );

                      //   updatedList.splice(index, 1);

                      //   setTodoList(updatedList);
                      //   originalTodoList.current = updatedList;
                      //   localStorage.setItem(
                      //     'todoList',
                      //     JSON.stringify(updatedList),
                      //   );

                      //   setEditedId(null);
                      //   setEditedTitle('');
                      // }}
                      onBlur={() => handleEditedSubmit(task)}
                    />
                  </form>
                ) : (
                  <>
                    <span
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => handleDoubleClick(task)}
                    >
                      {task.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleRemoveItem(todoList, task)}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {originalTodoList.current.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {/* 3 items left */}
              {`${number} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
                onClick={() => handleFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
                onClick={() => handleFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilter('completed')}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              // onClick={() => handleClearAll()}
              onClick={() => handleClearCompleted()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

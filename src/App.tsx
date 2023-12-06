import React, { useState, useMemo, useEffect } from 'react';

import { TodoAddForm } from './Components/TodoAddForm/TodoAddForm';
import { TodoList } from './Components/TodoList/TodoList';
import { TodosFilter } from './Components/TodosFilter/TodosFilter';

import { Todo } from './types/interfaces';

function getStorageData() {
  const storedData = localStorage.getItem('todos');

  if (storedData === null) {
    return null;
  }

  try {
    const data = JSON.parse(storedData);

    return data;
  } catch (err) {
    return null;
  }
}

function setStorageData(list: Todo[]) {
  const srginfifiedData = JSON.stringify(list);

  localStorage.setItem('todos', srginfifiedData);
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [modifier, setModifier] = useState('all');

  useEffect(() => {
    const storedData = getStorageData();

    setTodoList(storedData);
  }, []);

  const todoListToShow = useMemo(() => {
    switch (modifier) {
      case 'active':
        return todoList.filter(item => item.completed === false);
      case 'completed':
        return todoList.filter(item => item.completed === true);
      default:
        return todoList;
    }
  }, [modifier, todoList]);

  const [itemLeftToDoAmount, itemDoneAmount] = useMemo(() => {
    let itemsToDoCount = 0;
    let itemsDoneCount = 0;

    todoList.forEach(item => {
      if (item.completed) {
        itemsDoneCount += 1;
      } else {
        itemsToDoCount += 1;
      }
    });

    return [itemsToDoCount, itemsDoneCount];
  }, [todoList]);

  const handleAddTodo = (newTodoTitle: string) => {
    const newTodo = {
      id: +(Date.now()),
      title: newTodoTitle,
      completed: false,
    };

    setTodoList((prevState) => {
      const updatedList = [...prevState, newTodo];

      setStorageData(updatedList);

      return updatedList;
    });
  };

  const destroyTodo = (todoToDestroyId: number) => {
    setTodoList((prevState) => {
      const filteredTodoList = prevState.filter(item => {
        return item.id !== todoToDestroyId;
      });

      setStorageData(filteredTodoList);

      return filteredTodoList;
    });
  };

  const toggleTodoStatus = (todoIdToToggle: number) => {
    setTodoList((prevState) => {
      const toggledTodo = prevState.map(item => (
        item.id === todoIdToToggle
          ? { ...item, completed: !item.completed }
          : item
      ));

      setStorageData(toggledTodo);

      return toggledTodo;
    });

    setStorageData(todoList);
  };

  const handleClearCompleted = () => {
    setTodoList(prevState => {
      const filteredList = prevState.filter(item => item.completed === false);

      setStorageData(filteredList);

      return filteredList;
    });
  };

  const handleToggleAll = () => {
    setTodoList(prevState => {
      let newState: Todo[] = prevState;

      if (itemLeftToDoAmount > 0) {
        newState = newState.map(item => {
          return {
            ...item,
            completed: true,
          };
        });
      } else {
        newState = newState.map(item => {
          return {
            ...item,
            completed: false,
          };
        });
      }

      setStorageData(newState);

      return newState;
    });
  };

  const handleEditTodo = (todoIdToEdit: number, newTitle: string) => {
    setTodoList((prevState) => {
      const newListWithChangedTodo = prevState.map(item => (
        item.id === todoIdToEdit
          ? { ...item, title: newTitle }
          : item
      ));

      setStorageData(newListWithChangedTodo);

      return newListWithChangedTodo;
    });

    setStorageData(todoList);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoAddForm
          handleAddTodo={(title) => handleAddTodo(title)}
        />
      </header>

      <section className="main">
        <TodoList
          todoList={todoListToShow}
          destroyTodo={(id) => destroyTodo(id)}
          toggleTodoStatus={(id) => toggleTodoStatus(id)}
          toggleAll={handleToggleAll}
          handleEditTodo={handleEditTodo}
        />
      </section>

      <footer className="footer">
        <TodosFilter
          itemLeftToDo={itemLeftToDoAmount}
          handleTodoList={(mod) => setModifier(mod)}
          handleClearCompleted={handleClearCompleted}
          itemDone={itemDoneAmount}
        />
      </footer>
    </div>
  );
};

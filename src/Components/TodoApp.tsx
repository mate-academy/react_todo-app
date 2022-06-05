import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { saveTodoList, getTodoList } from '../API';
import { Filter } from '../enums';

export const TodoApp: React.FC = () => {
  const { todoFilter } = useParams();

  const [inputValue, setInputValue] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>(getTodoList());
  const [todoListSelected, setTodoListSelected] = useState<Todo[]>([]);

  useEffect(() => {
    switch (todoFilter) {
      case Filter.Active:
        setTodoListSelected(todoList.filter(todo => todo.completed === false));
        break;
      case Filter.Completed:
        setTodoListSelected(todoList.filter(todo => todo.completed === true));
        break;
      case Filter.All:
      default:
        setTodoListSelected(todoList);
        break;
    }
  }, [todoList, todoFilter]);

  useEffect(() => {
    saveTodoList(todoList);
  }, [todoList]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length !== 0 && inputValue.trim() !== '') {
      setTodoList([...todoList, {
        id: +(new Date()),
        completed: false,
        title: inputValue,
      }]);
      setInputValue('');
    }
  };

  const toggleClass = (index: number) => {
    const updatedTodoList = [...todoList];

    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);
  };

  const destroyHandler = (index: number) => {
    const filtered = todoList.filter((_el, i) => i !== index);

    setTodoList(filtered);
  };

  const clearHandler = () => {
    setTodoList(todoList.filter(todo => todo.completed === false));
  };

  const changeTodo = (todoValue: string, index: number) => {
    const todoListCopy = [...todoList];

    todoListCopy[index].title = todoValue;

    setTodoList(todoListCopy);
  };

  const toggleAll = () => {
    let isCompleted = true;

    if (todoList.find(todo => todo.completed === false) === undefined) {
      isCompleted = false;
    }

    const todoListToggled = todoList.map(todo => (
      { ...todo, completed: isCompleted }));

    setTodoList(todoListToggled);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            data-cy="createTodo"
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            id="idinput"
            value={inputValue}
            onChange={inputHandler}
          />
        </form>
      </header>
      <TodoList
        todoList={todoListSelected}
        destroyHandler={destroyHandler}
        toggleClass={toggleClass}
        changeTodo={changeTodo}
        toggleAll={toggleAll}
      />
      {todoList.length > 0
        && (
          <TodosFilter
            todoList={todoList}
            clearHandler={clearHandler}
            filter={todoFilter}
          />
        )}
    </>
  );
};

export default TodoApp;

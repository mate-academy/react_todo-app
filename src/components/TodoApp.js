import React from 'react';
import uuidv4 from 'uuid/v4';
import { NewTodo } from './NewTodo';
import { ToggleAll } from './ToggleAll';
import { TodoList } from './TodoList';
import { LeftItems } from './LeftItems';
import { TodosFilter } from './TodosFilter';
import { ClearButton } from './ClearButton';
import { FilterUtils } from '../utils/FilterUtils';
import { TodosUtils } from '../utils/TodosUtils';

export class TodoApp extends React.PureComponent {
  state = {
    todos: [],
    allTodosCompleted: false,
    activeFilter: FilterUtils.FILTER.ALL,
  };

  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    const allTodosCompleted = JSON.parse(
      window.localStorage.getItem('allTodosCompleted'),
    );

    if (todos) {
      this.setState({ todos });
    }

    if (allTodosCompleted) {
      this.setState({ allTodosCompleted });
    }
  }

  saveInfoToStorage = () => {
    const { todos, allTodosCompleted } = this.state;

    window.localStorage.setItem('todos', JSON.stringify(todos));
    window.localStorage.setItem(
      'allTodosCompleted', JSON.stringify(allTodosCompleted),
    );
  };

  setAllTodosCompletedValue = () => {
    const { todos } = this.state;

    this.setState({
      allTodosCompleted: todos.length && todos.every(todo => todo.completed),
    });
  };

  addNewTodo = (text) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: uuidv4(),
          title: text,
          completed: false,
        },
      ],
      allTodosCompleted: false,
    }), this.saveInfoToStorage);
  };

  toggleTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }), () => {
      this.saveInfoToStorage();
      this.setAllTodosCompletedValue();
    });
  };

  handleToggleAllChange = () => {
    this.setState(prevState => ({
      allTodosCompleted: !prevState.allTodosCompleted,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !prevState.allTodosCompleted,
      })),
    }), this.saveInfoToStorage);
  };

  removeAllCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      allTodosCompleted: false,
    }), this.saveInfoToStorage);
  };

  removeTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }), () => {
      this.saveInfoToStorage();
      this.setAllTodosCompletedValue();
    });
  };

  updateTodoText = (todoId, text) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          title: text,
        };
      }),
    }), this.saveInfoToStorage);
  };

  setActiveFilter = (activeFilter) => {
    this.setState({ activeFilter });
  };

  render() {
    const { todos, allTodosCompleted, activeFilter } = this.state;

    const leftItemsCount = todos.filter(todo => !todo.completed).length;

    const visibleTodos = TodosUtils.getVisibleTodos(todos, activeFilter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo
            onKeyDown={this.addNewTodo}
          />
        </header>

        <section className="main">
          <ToggleAll
            value={allTodosCompleted}
            onToggleAllChange={this.handleToggleAllChange}
          />
          <TodoList
            todos={visibleTodos}
            onTodoToggle={this.toggleTodo}
            onTodoRemove={this.removeTodo}
            onTodoTextUpdate={this.updateTodoText}
          />
        </section>

        <footer className="footer">
          <LeftItems count={leftItemsCount} />
          <TodosFilter
            activeFilter={activeFilter}
            onFilterClick={this.setActiveFilter}
          />
          <ClearButton
            onClick={this.removeAllCompletedTodos}
            todos={todos}
          />
        </footer>
      </section>
    );
  }
}

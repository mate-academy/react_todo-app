import React from 'react';
import uuidv4 from 'uuid/v4';
import { NewTodo } from './components/NewTodo';
import { ToggleAll } from './components/ToggleAll';
import { TodoList } from './components/TodoList';
import { LeftItems } from './components/LeftItems';
import { TodosFilter } from './components/TodosFilter';
import { ClearButton } from './components/ClearButton';
import { filterUtils } from './utils/filterUtils';
import { todosUtils } from './utils/todosUtils';

export class App extends React.PureComponent {
  state = {
    todos: [],
    allTodosCompleted: false,
    activeFilter: filterUtils.FILTER.ALL,
  };

  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    const allTodosCompleted = JSON.parse(
      window.localStorage.getItem('allTodosCompleted'),
    );

    this.setState({
      todos: todos || [],
      allTodosCompleted: allTodosCompleted || false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos, allTodosCompleted } = this.state;

    if (todos !== prevState.todos) {
      window.localStorage.setItem('todos', JSON.stringify(todos));

      this.setAllTodosCompletedValue();
    }

    if (allTodosCompleted !== prevState.allTodosCompleted) {
      window.localStorage.setItem(
        'allTodosCompleted', JSON.stringify(allTodosCompleted),
      );
    }
  }

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
    }));
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
    }));
  };

  handleToggleAllChange = () => {
    this.setState(prevState => ({
      allTodosCompleted: !prevState.allTodosCompleted,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !prevState.allTodosCompleted,
      })),
    }));
  };

  removeAllCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      allTodosCompleted: false,
    }));
  };

  removeTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
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
    }));
  };

  setActiveFilter = (activeFilter) => {
    this.setState({
      activeFilter,
    });
  };

  render() {
    const { todos, allTodosCompleted, activeFilter } = this.state;

    const leftItemsCount = todos.filter(todo => !todo.completed).length;
    const visibleTodos = todosUtils.getVisibleTodos(todos, activeFilter);

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

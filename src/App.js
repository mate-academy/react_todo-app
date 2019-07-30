import React from 'react';
import InputField from './component/InputField';
import Toggle from './component/Toggle';
import TodoList from './component/TodoList';
import FilterBtns from './component/FilterBtns';
import ClearBtn from './component/ClearBtn';

class App extends React.Component {
  state = {
    todoList: [],
    filterByButton: '',
  };

  addNewTodo = (text) => {
    const todoItem = {
      title: text,
      id: Date.now(),
      completed: false,
    };

    this.setState((prevState) => {
      const todos = [...prevState.todoList, todoItem];

      return {
        todoList: todos,
      };
    });
  };

  countUncompletedTodos = () => this.state.todoList
    .filter(item => !item.completed).length;

  deleteAllCompletedTodos = () => {
    this.setState((prevState) => {
      const uncompletedTodos = prevState.todoList
        .filter(item => !item.completed);

      return {
        todoList: [...uncompletedTodos],
      };
    });
  };

  deleteItem = (taskId) => {
    this.setState((prevState) => {
      const withoutRemovedItems = prevState.todoList
        .filter(item => item.id !== taskId);

      return {
        todoList: [...withoutRemovedItems],
      };
    });
  }

  handleFilter = (filterBy) => {
    this.setState({
      filterByButton: filterBy,
    });
  };

  toggleAll = () => {
    this.setState((prevState) => {
      const todos = prevState.todoList.map(todo => ({
        ...todo,
        completed: !prevState.todoList.every(done => done.completed),
      }));

      return {
        todoList: todos,
      };
    });
  };

  toggleChecked = (taskId) => {
    this.setState((prevState) => {
      const todos = prevState.todoList.map(todo => (todo.id === taskId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo));

      return {
        todoList: todos,
      };
    });
  };

  render() {
    const { todoList, filterByButton } = this.state;
    const countUncompletedTodos = this.countUncompletedTodos();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <InputField addNewTodo={this.addNewTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <Toggle toggleAll={this.toggleAll} />

          <TodoList
            filterByButton={filterByButton}
            todoList={todoList}
            toggleChecked={this.toggleChecked}
            deleteItem={this.deleteItem}
          />
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {countUncompletedTodos}
            items left
          </span>

          <FilterBtns
            handleFilter={this.handleFilter}
          />

          <ClearBtn
            todoList={todoList}
            deleteAllCompletedTodos={this.deleteAllCompletedTodos}
          />
        </footer>
      </section>
    );
  }
}

export default App;

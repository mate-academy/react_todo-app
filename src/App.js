import React from 'react';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Filter from './TodosFilter';

class App extends React.Component {
  state = {
    todoList: [], allCompleted: false, filter: 'All',
  };

  handleAddingTodo = (newTodo) => {
    this
      .setState(({ todoList }) => ({ todoList: [...todoList, newTodo] }));
  };

  handleCheckItem = (id) => {
    this
      .setState(({ todoList }) => (
        { todoList: todoList.map(item => (
          item.id === id ? {
            ...item, completed: !item.completed,
          } : item)) }));

    this.setState(({ todoList }) => (
      { allCompleted: todoList.every(item => item.completed) }
    ));
  };

  handleDestroyItem = (id) => {
    this.setState(({ todoList }) => (
      { todoList: todoList
        .filter(item => item.id !== id) }
    ));
  };

  handleCompleteAll = () => {
    this
      .setState(({ todoList, allCompleted }) => ({
        allCompleted: !allCompleted,
        todoList: todoList
          .map(item => ({
            ...item, completed: !allCompleted,
          })),
      }));
  };

  handleSelectActive = () => {
    this
      .setState({ filter: 'Active' });
  };

  handleSelectCompleted = () => {
    this
      .setState({ filter: 'Completed' });
  };

  handleSelectAll = () => {
    this
      .setState({ filter: 'All' });
  };

  handleClear= () => {
    this.setState(({ todoList }) => (
      { todoList: todoList
        .filter(item => !item.completed) }
    ));
  };

  render() {
    const { todoList, filter, allCompleted } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.handleAddingTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.handleCompleteAll}
            checked={allCompleted}
          />
          {todoList.length > 0 && (
            <label htmlFor="toggle-all">
              {allCompleted ? 'Mark all as active' : 'Mark all as completed'}
            </label>
          )}
          <TodoList
            todos={todoList}
            selectedFilter={filter}
            handleCheck={this.handleCheckItem}
            handleDestroy={this.handleDestroyItem}
          />
        </section>
        {todoList.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {`${todoList.filter(item => !item.completed).length} items left`}
            </span>

            <ul className="filters">
              <Filter
                handleClick={this.handleSelectAll}
                selectedFilter={filter}
              >
                All
              </Filter>
              <Filter
                handleClick={this.handleSelectActive}
                selectedFilter={filter}
              >
                Active
              </Filter>
              <Filter
                handleClick={this.handleSelectCompleted}
                selectedFilter={filter}
              >
                Completed
              </Filter>
            </ul>

            {todoList.some(item => item.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.handleClear}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>
    );
  }
}

export default App;

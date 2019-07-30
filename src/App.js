import React from 'react';
import TodoList from './TodoList';
import TodoApp from './TodoApp';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    filter: 0, // 0 - all, 1 - Active, 2- Completed
  };

  handleChangeFilter = newFilterValue => () => {
    this.setState({
      filter: newFilterValue,
    });
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  destroyItem = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
    }));
  };

  handleOnchange = (id, completed) => {
    const { todos } = this.state;

    const newTodos = todos.map(todo => ((todo.id === id)
      ? { ...todo, completed }
      : todo));

    this.setState({
      todos: newTodos,
    });
  };

  render() {
    const { todos, filter } = this.state;
    const notCompletedCount = todos.filter(todo => !todo.completed).length;
    let filteredList;

    switch (filter) {
      case 0:
        filteredList = todos;
        break;
      case 1:
        filteredList = todos.filter(todo => !todo.completed);
        break;
      case 2:
        filteredList = todos.filter(todo => todo.completed);
        break;
      default:
        // do nothing
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp addNewTodo={this.addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredList}
            handleChange={this.handleOnchange}
            destroyItem={this.destroyItem}
          />
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${notCompletedCount} items left`}
          </span>

          <TodosFilter changeFilter={this.handleChangeFilter} filter={filter} />
          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>
      </section>
    );
  }
}

export default App;

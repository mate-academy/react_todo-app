import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

const cashedFilteredTodos = (callback) => {
  let prevArgs = [];
  let prevValue = [];

  return (...args) => {
    if (args.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    const [todos, state] = args;
    prevArgs = args;
    prevValue = callback(todos, state);

    return prevValue;
  };
};

const getfilteredTodos = (todos, state) => {
  const filteredTodos = todos.filter((item) => {
    switch (state) {
      case 'Active':
        return !item.completed;

      case 'Completed':
        return item.completed;

      default:
        return item;
    }
  });

  return filteredTodos;
};

const getCashedFilteredTodos = cashedFilteredTodos(getfilteredTodos);

class App extends React.Component {
  state = {
    todos: [],
    filterState: 'All',
    allCompleted: false,
  }

  handleAllCompleted = (event) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        { ...todo, completed: !prevState.allCompleted }
      )),
      allCompleted: !prevState.allCompleted,
      filterState: 'All',
    }));
  }

  writeNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [newTodo, ...prevState.todos],
      filterState: 'All',
    }));
  }

  rewriteExistingTodo = (title, id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, title };
        }
        return todo;
      }),
    }));
  }

  toggleComplete = id => (
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        item.id === id
        && (item = { ...item, completed: !item.completed });

        return item;
      }),

      filterState: 'All',
    })));

  destroyItem = id => (
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
      filterState: 'All',
    })));

  destroyAllComleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => (!item.completed)),

      allCompleted: false,
      filterState: 'All',
    }));
  }

  handlefilter = (state) => {
    this.setState(prevState => ({
      filterState: state,
    }));
  }

  isExistingAndUnique = (value, arr) => {
    if (value && !arr.some(item => item.title === value)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      allCompleted, todos, filterState,
    } = this.state;

    const filteredtodos = getCashedFilteredTodos([...todos], filterState);

    return (
      <section className="todoapp">
        <Header
          writeNewTodo={this.writeNewTodo}
          todos={todos}
          isExistingAndUnique={this.isExistingAndUnique}
        />

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={allCompleted}
            onChange={this.handleAllCompleted}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredtodos.map(todo => (
              <TodoItem
                todos={todos}
                todo={todo}
                key={todo.id}

                toggleComplete={this.toggleComplete}
                destroyItem={this.destroyItem}
                rewriteExistingTodo={this.rewriteExistingTodo}
                isExistingAndUnique={this.isExistingAndUnique}
              />
            ))}
          </ul>
        </section>

        <Footer
          todos={todos}
          handlefilter={this.handlefilter}
          destroyAllComleted={this.destroyAllComleted}
          filterState={filterState}
        />
      </section>
    );
  }
}

export default App;

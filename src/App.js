import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import TodoItem from './components/TodoItem';

import cashedFilteredTodos from './helpers/helpers';

const getfilteredTodos = (todos, statut) => {
  const filteredTodos = todos.filter((item) => {
    switch (statut) {
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
    filterStatut: 'All',
    allCompleted: false,
  }

  toggleAllComplete = (event) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        { ...todo, completed: !prevState.allCompleted }
      )),
      allCompleted: !prevState.allCompleted,
      filterStatut: 'All',
    }));
  }

  writeNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [newTodo, ...prevState.todos],
      filterStatut: 'All',
    }));
  }

  rewriteExistingTodo = (title, id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => (todo.id === id ? { ...todo, title } : todo)),
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => (
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )),

      filterStatut: 'All',
    }));
  }

  destroyItem = id => (
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      filterStatut: 'All',
    })));

  destroyAllComleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (!todo.completed)),
      allCompleted: false,
      filterStatut: 'All',
    }));
  }

  handlefilter = statut => (
    this.setState({ filterStatut: statut })
  );

  isExistingAndUnique = (value, arr) => (
    value && !arr.some(todo => todo.title === value)
  );

  render() {
    const { allCompleted, todos, filterStatut } = this.state;

    const filteredtodos = getCashedFilteredTodos([...todos], filterStatut);

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
            onChange={this.toggleAllComplete}
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
          filterStatut={filterStatut}
        />
      </section>
    );
  }
}

export default App;

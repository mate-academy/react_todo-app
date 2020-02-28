import React from 'react';
import Form from './components/Form/Form';
import ToDoList from './components/ToDoList/ToDoList';
import Filter from './components/Filter/Filter';

const FILTERS = [
  { name: 'all' },
  { name: 'completed' },
  { name: 'active' },
];

class App extends React.Component {
  state = {
    todoList: [],
    everyCompleted: false,
    currentFilter: 'all',
  }

  addToDo = (todo) => {
    this.setState(state => ({
      todoList: [...state.todoList, todo],
      everyCompleted: false,
    }));
  }

  toggleAllComplete = () => {
    this.setState(state => ({
      everyCompleted: !state.everyCompleted,
      todoList: state.todoList.map(todo => (
        {
          ...todo,
          completed: !state.everyCompleted,
        }
      )),
    }));
  }

  toggleTodoComplete = (itemId) => {
    this.setState(state => ({
      todoList: state.todoList.map((todo) => {
        if (itemId === todo.idToDo) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
    this.setState(state => ({
      everyCompleted: state.todoList.every(todo => todo.completed),
    }));
  }

  isAllChecked = () => this.state.todoList.every(todo => todo.completed);

  deleteItem = (itemId) => {
    this.setState(state => ({
      todoList: state.todoList.filter(({ idToDo }) => idToDo !== itemId),
    }));
  }

  setFilter = (name) => {
    this.setState({
      currentFilter: name,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todoList: state.todoList.filter(({ completed }) => completed === false),
    }));
  }

  render() {
    const { todoList, currentFilter } = this.state;
    const filteredTodos = (todos, filter) => {
      switch (filter) {
        case 'completed':
          return todos.filter(({ completed }) => completed);
        case 'active':
          return todos.filter(({ completed }) => !completed);
        default:
          return todos;
      }
    };

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Form addToDo={this.addToDo} />
        </header>
        {this.state.todoList.length !== 0
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={this.toggleAllComplete}
                checked={this.isAllChecked()}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <ToDoList
                list={filteredTodos(todoList, currentFilter)}
                markComplete={this.toggleTodoComplete}
                deleteItem={this.deleteItem}
              />
            </section>
            <footer className="footer">
              <span className="todo-count">
                {todoList.filter(({ completed }) => !completed)
                  .length}
                  items left
              </span>

              <ul className="filters">
                {FILTERS.map(item => (
                  <Filter
                    filterName={item.name}
                    filter={this.setFilter}
                    currentFilter={currentFilter}
                    key={item.name}
                  />
                ))}
              </ul>

              <button
                type="button"
                className="clear-completed"
                onClick={() => this.clearCompleted()}
              >
                Clear completed
              </button>
            </footer>
          </>
        )
        }
      </section>
    );
  }
}

export default App;

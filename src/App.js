import React from 'react';
import Form from './Form';
import ToDoList from './ToDoList';
import Filter from './Filter';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

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

  markAllAsComplete = () => {
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

  markItemAsComplete = (itemId) => {
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
      currentFilter: FILTERS[name],
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
          return todos.filter(({ completed }) => completed === true);
        case 'active':
          return todos.filter(({ completed }) => completed === false);
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
        {!!this.state.todoList.length
          && (
            <>
              <section className="main">
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  onChange={this.markAllAsComplete}
                  checked={this.isAllChecked()}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ToDoList
                  list={filteredTodos(todoList, currentFilter)}
                  markComplete={this.markItemAsComplete}
                  deleteItem={this.deleteItem}
                />
              </section>
              <footer className="footer">
                <span className="todo-count">
                  {todoList.filter(({ completed }) => completed === false)
                    .length}
                  items left
                </span>

                <ul className="filters">
                  <Filter
                    filterName="all"
                    filter={this.setFilter}
                    currentFilter={currentFilter}
                  />
                  <Filter
                    filterName="completed"
                    filter={this.setFilter}
                    currentFilter={currentFilter}
                  />
                  <Filter
                    filterName="active"
                    filter={this.setFilter}
                    currentFilter={currentFilter}
                  />
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

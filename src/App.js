import React, { Component } from 'react';
import AddTodo from './components/addTodo/AddTodo';
import TodoList from './components/todoList/TodoList';
import TodoFilter from './components/todoFilters/TodoFilter';
import MassAction from './components/massActitons/MassAction';
import ClearCompleted from './components/clearCopmleted/ClearCompleted';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      idCounter: 0,
      filter: 'initial',
    };

    this.pushItem = this.pushItem.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.isCompleted = this.isCompleted.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.statusFilter = this.statusFilter.bind(this);
    this.deleteCompleted = this.deleteCompleted.bind(this);
  }

  pushItem(todo) {
    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          title: todo,
          id: prevState.idCounter + 1,
          completed: false,
        },
      ],
      filter: 'initial',
    }));
    this.setState(prevState => ({
      idCounter: prevState.idCounter + 1,
    }));
  }

  deleteTask(id) {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }));
  }

  deleteCompleted() {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => !todo.completed),
    }));
  }

  isCompleted(obj) {
    this.setState(prevState => ({
      todoList: prevState.todoList.map((todo) => {
        if (todo.id === obj.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  toggleAll() {
    if (this.state.todoList.some(todo => todo.completed === false)) {
      this.setState(prevState => ({
        todoList: prevState.todoList
          .map(todo => ({ ...todo, completed: true })),
      }));
    } else {
      this.setState(prevState => ({
        todoList: prevState.todoList
          .map(todo => ({ ...todo, completed: false })),
      }));
    }
  }

  statusFilter(filterBy) {
    this.setState({
      filter: filterBy,
    });
  }

  render() {
    let itemsToDisplay;

    switch (this.state.filter) {
      case 'completed':
        itemsToDisplay = [...this.state.todoList]
          .filter(todo => todo.completed === true);
        break;
      case 'active':
        itemsToDisplay = [...this.state.todoList]
          .filter(todo => todo.completed === false);
        break;
      default:
        itemsToDisplay = [...this.state.todoList];
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <AddTodo onSubmit={this.pushItem} />
        </header>

        <section
          className="main"
          style={this.state.todoList.length > 0
            ? { display: 'block' }
            : { display: 'none' }}
        >
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <MassAction action={this.toggleAll} />

          <TodoList
            todoList={itemsToDisplay}
            isCompleted={this.isCompleted}
            deleteitem={this.deleteTask}
          />
        </section>

        <footer
          className="footer"
          style={this.state.todoList.length > 0
            ? { display: 'block' }
            : { display: 'none' }}
        >
          <span className="todo-count">
            {this.state.todoList
              .filter(todo => !todo.completed)
              .length
            }
            {' '}
            items left
          </span>

          <TodoFilter
            statusFilter={this.statusFilter}
            currentFilter={this.state.filter}
          />
          <ClearCompleted
            deleteCompleted={this.deleteCompleted}
            isVisible={this.state.todoList
              .filter(todo => todo.completed).length > 0}
          />
        </footer>
      </section>
    );
  }
}

export default App;

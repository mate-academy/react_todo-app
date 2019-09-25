import React from 'react';

import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todosList: [],
    filteredTodosList: [],
    activeFilter: '',
  };

  addTodo = (value) => {
    if (value !== '') {
      this.setState(prevState => ({
        filteredTodosList: [...prevState.todosList, {
          id: prevState.todosList.length + 1,
          value,
          completed: false,
        }],
        todosList: [...prevState.todosList, {
          id: prevState.todosList.length + 1,
          value,
          completed: false,
        }],
      }));
    }
  };

  handleCheck = (id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList
        .map((todo) => {
          if (todo.id === id) {
            return {
              id: todo.id,
              value: todo.value,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      filteredTodosList: prevState.todosList
        .map((todo) => {
          if (todo.id === id) {
            return {
              id: todo.id,
              value: todo.value,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
    }));
  };

  handleDestroy = (id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList
        .filter(todo => todo.id !== id),
      filteredTodosList: prevState.todosList
        .filter(todo => todo.id !== id),
    }));
  };

  handleAllChecked = (checked) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.map(todo => ({
        ...todo, completed: checked,
      })),
      filteredTodosList: todosList.map(todo => ({
        ...todo, completed: checked,
      })),
    }));
  };

  handleAll = () => {
    this.setState(prevState => ({
      filteredTodosList: prevState.todosList,
      activeFilter: 'all',
    }));
  };

  handleActive = () => {
    this.setState(prevState => ({
      filteredTodosList: prevState.todosList
        .filter(todo => !todo.completed),
      activeFilter: 'active',
    }));
  };

  handleCompleted = () => {
    this.setState(prevState => ({
      filteredTodosList: prevState.todosList
        .filter(todo => todo.completed),
      activeFilter: 'completed',
    }));
  };

  render() {
    const { filteredTodosList, activeFilter, todosList } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoAdd addTodo={this.addTodo} />
        </header>

        <section className="main" style={{display: 'block'}}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={e => this.handleAllChecked(e.target.checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {filteredTodosList.map(todo =>
            <TodoList
              key={todo.id}
              todo={todo}
              checked={todo.completed}
              isChecked={this.handleCheck}
              destroy={this.handleDestroy}
            />)
          }
        </section>

        <Footer
          todosList={todosList}
          filteredAll={this.handleAll}
          filteredCompleted={this.handleCompleted}
          filteredActive={this.handleActive}
          activeFilter={activeFilter}
        />
      </section>
    );
  }
}

export default App;

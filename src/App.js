import React from 'react';
import Header from './Components/Header';
import TodosList from './Components/TodosList';
import Footer from './Components/Footer';
import './App.css';

class App extends React.Component {
  state = {
    todo: '',
    currentIndex: 0,
    todosList: [],
    filteredTodosList: [],
    filterField: 'all',
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      todo: value.trimLeft(),
    });
  };

  handleSubmit = (todo, currentIndex, event) => {
    event.preventDefault();
    if (todo) {
      const todoItem = {
        todoTitle: todo,
        id: currentIndex,
        completed: false,
      };

      this.setState(prevState => ({
        ...prevState,
        todo: '',
        currentIndex: prevState.currentIndex + 1,
        todosList: [...prevState.todosList, todoItem],
        filteredTodosList: [...prevState.todosList, todoItem],
        filterField: 'all',
      }));
    }
  };

  handleCheck = (
    { target },
    todoItem,
    filterField,
    showTodos
  ) => {
    function check(list, id, checked) {
      return list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: checked,
          };
        }

        return item;
      });
    }

    this.setState(prevState => ({
      todosList: check(prevState.todosList, todoItem.id, target.checked),
      filteredTodosList:
        check(prevState.filteredTodosList, todoItem.id, target.checked),
    }));

    if (filterField === 'active') {
      showTodos(filterField);
    } else if (filterField === 'completed') {
      showTodos(filterField);
    }
  };

  handleRemove = (todoItem) => {
    function remove(list, id) {
      return list.filter(item => item.id !== id);
    }

    this.setState(prevState => ({
      todosList: remove(prevState.todosList, todoItem.id),
      filteredTodosList: remove(prevState.filteredTodosList, todoItem.id),
    }));
  };

  showTodos = (filterType) => {
    switch (filterType) {
      case 'active':
        return this.setState(prevState => ({
          filteredTodosList:
            prevState.todosList.filter(todo => todo.completed === false),
          filterField: 'active',
        }));
      case 'completed':
        return this.setState(prevState => ({
          filteredTodosList:
            prevState.todosList.filter(todo => todo.completed === true),
          filterField: 'completed',
        }));
      default:
        return this.setState(prevState => ({
          filteredTodosList: prevState.todosList,
          filterField: 'all',
        }));
    }
  };

  toggleCompleted = ({ target }) => {
    function toggle(list, checked) {
      return list.map(item => ({
        ...item,
        completed: checked,
      }));
    }

    this.setState(prevState => ({
      filteredTodosList: toggle(prevState.filteredTodosList, target.checked),
      todosList: toggle(prevState.todosList, target.checked),
    }));
  };

  deleteAllCompleted = (showTodos) => {
    this.setState(prevState => ({
      filteredTodosList:
        prevState.todosList.filter(todo => todo.completed === false),
      todosList: prevState.todosList.filter(todo => todo.completed === false),
    }));
    showTodos('all');
  };

  render() {
    const {
      todosList, todo, filteredTodosList, filterField, currentIndex,
    } = this.state;

    if (todosList.length < 1) {
      return (
        <section className="todoapp">
          <Header
            todo={todo}
            currentIndex={currentIndex}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </section>
      );
    }

    return (
      <section className="todoapp">
        <Header
          todo={todo}
          currentIndex={currentIndex}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TodosList
          filteredTodosList={filteredTodosList}
          handleCheck={this.handleCheck}
          showTodos={this.showTodos}
          handleRemove={this.handleRemove}
          toggleCompleted={this.toggleCompleted}
          filterField={filterField}
        />

        <Footer
          todosList={todosList}
          filteredTodosList={filteredTodosList}
          filterField={filterField}
          showTodos={this.showTodos}
          deleteAllCompleted={this.deleteAllCompleted}
        />
      </section>
    );
  }
}

export default App;

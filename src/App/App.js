import React from 'react';

import TodoList from '../TodoList/TodoList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends React.Component {
  state = {
    todosList: [],
    filteredField: '',
    inputValue: '',
    completedLength: 0,
  };

  componentWillMount() {
    console.log(window.location.href);
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(JSON.parse(localStorage.getItem('state')));
    this.setState({ ...state });
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    localStorage.setItem('state', JSON.stringify(nextState));
  }

  changeFilter = async(e) => {
    console.log(e.target);
    let filterValue = e.target.href.match(/#\/([a-z]+)/);

    if (filterValue) {
      filterValue = filterValue[1];
    } else {
      filterValue = '';
    }

    this.setState({ filteredField: filterValue });
  };

  filterTodos = (todosList) => {
    const { filteredField } = this.state;
    let status;

    switch (filteredField) {
      case 'completed':
        status = true;
        break;
      case 'active':
        status = false;
        break;
      default: return todosList;
    }

    return todosList.filter(todo => todo.completed === status);
  };

  completeTodo = (id) => {
    this.setState((prevState) => {
      const todosList = [...prevState.todosList];
      const index = todosList.findIndex(todo => todo.id === id);
      const togle = !todosList[index].completed;

      todosList[index].completed = togle;
      let completedLength;

      if (togle) {
        completedLength = prevState.completedLength + 1;
      } else {
        completedLength = prevState.completedLength - 1;
      }

      return { todosList, completedLength };
    });
  };

  togleAllComplete = () => {
    let { completedLength, todosList } = this.state;
    const togle = completedLength !== todosList.length;

    this.setState((prevState) => {
      todosList = prevState.todosList.map((todo) => {
        const { id, title } = todo;
        return {
          id,
          title,
          completed: togle,
        };
      });

      completedLength = togle ? prevState.todosList.length : 0;
      return { todosList, completedLength };
    });
  };

  deleteAllCompleted = () => {
    this.setState((prevState) => {
      let todosList = [...prevState.todosList];

      todosList = todosList.filter(todo => !todo.completed);
      return { todosList, completedLength: 0 };
    });
  };

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const todosList = [...prevState.todosList];

      const elemIndex = todosList.findIndex(todo => todo.id === id);
      const completedLength = prevState.completedLength - 1;
      todosList.splice(elemIndex, 1);

      return { todosList, completedLength };
    });
  };

  changeInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  createTodo = (e, id) => {
    const title = this.state.inputValue.trim();
    if (e.key === 'Enter' && title) {
      const todoItem = {
        id,
        title,
        completed: false,
      };

      this.setState((prevState) => {
        const list = [...prevState.todosList];
        list.push(todoItem);
        return { todosList: list, inputValue: '' };
      });
    }
  };

  addId = (callback) => {
    let id = 1;
    return (e) => {
      id += 1;
      callback(e, id);
    };
  };

  render() {
    const {
      todosList,
      inputValue,
      completedLength,
      filteredField,
    } = this.state;

    const filteredTodosList = this.filterTodos(todosList);
    const todosLeft = todosList.length - completedLength;
    const addTodo = this.addId(this.createTodo);

    return (
      <section className="todoapp">

        <Header
          inputValue={inputValue}
          changeInput={this.changeInput}
          addTodo={addTodo}
        />
        {
          todosList.length > 0 && (
            <>
              <TodoList
                completedLength={completedLength}
                completeTodo={this.completeTodo}
                togleAllComplete={this.togleAllComplete}
                deleteTodo={this.deleteTodo}
                todosList={filteredTodosList}
              />
              <Footer
                filteredField={filteredField}
                todosLeft={todosLeft}
                completedLength={completedLength}
                changeFilter={this.changeFilter}
                deleteAllCompleted={this.deleteAllCompleted}
              />
            </>
          )
        }

      </section>
    );
  }
}

export default App;



import React from 'react';
import shortid from 'shortid';

class TodoForm extends React.Component {
    state = {
        text: '',
    }

    handlChange = (event) => {
this.setState({
    [event.target.name]: event.target.value
})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            complete: false,
        })
        this.setState({
            text: ""
        })
    }

    render() {
        return (

      //     <section className="todoapp" >
      // <header className="header">
      //   <h1>todos</h1>

      //   <input
      //     className="new-todo"
      //     placeholder="What needs to be done?"
      //   />
      // </header>

      // <section className="main" style={{ display: 'block' }}>
      //   <input type="checkbox" id="toggle-all" className="toggle-all" />
      //   <label htmlFor="toggle-all">Mark all as complete</label>


            <form onSubmit = {this.handleSubmit}>
        <input
        name = "text"
        // placeholder="write text"
        value = {this.state.text}
        onChange = {this.handlChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
<button
onClick={this.handleSubmit}
          className="clear-completed"
          style={{ display: 'block' }}
>Add todo
</button>
</form>
        )
    }
}

export default TodoForm;

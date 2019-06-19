import React from 'react'

const Header = (props) => {
    return (
        <header className="header">
            <h1>todos</h1>

            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus=""
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        const newItem = { 'text': event.target.value, 'isCompleted': false };
                        props.updateToDoItems(newItem);
                        event.target.value = '';
                    }
                }}
            />
        </header>
    )
}

export default Header
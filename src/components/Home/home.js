import axios from "axios";
import React, { Component } from 'react';
import TodoItem from '../TodoItem/todoItem';
import "./home.css";

class Home extends Component {
    state = {
        todoText: "",
        todosList: [],
        isAddTodo: false,
        addText: ""
    };

    getTodos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/get-todos");
            this.setState({ todosList: response.data.todo });
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getTodos();
    }

    renderComponent = () => {
        this.getTodos();
    };

    addTodo = () => {
        this.setState(prevState => ({ isAddTodo: !prevState.isAddTodo }));
    };

    handleSetText = (event) => {
        this.setState({ addText: event.target.value });
    };

    saveTodo = async () => {
        try {
            const { addText } = this.state;
            const data = { text: addText };
            await axios.post("http://localhost:5000/add-todo", data);
            this.setState({ addText: "", isAddTodo: false });  
            this.getTodos();
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { todosList, isAddTodo, addText } = this.state;

        return (
            <div className="home-page-container">
                <h1>Todos</h1>
                <button onClick={this.addTodo}>Add</button>
                {isAddTodo ? (
                    <div>
                        <input
                            type="text"
                            value={addText}
                            onChange={this.handleSetText}
                        />
                        <button onClick={this.saveTodo}>Save</button>
                    </div>
                ) : (
                    todosList.length > 0 ? (
                        <ul className="unorder-list">
                            {todosList.map(todo => (
                                <TodoItem key={todo._id} todo={todo} renderComponent={this.renderComponent} />
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p>Empty todos</p>
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default Home;

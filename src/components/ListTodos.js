import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo'

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todos => todos.todo_id !== id));
            console.log(deleteTodo);
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:4000/todos");
            const jsonData = await response.json();
            console.log(jsonData);
            setTodos(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment >
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Descrition</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.todo_id}</td>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo} /></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
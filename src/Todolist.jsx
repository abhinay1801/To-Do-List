import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Todolist.css'

export default function Todolist() {

    let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4() }]);
    let [newTodo, setNewTodo] = useState("");

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), done: false }];
        });
        setNewTodo("");

    };

    let deleteTodo = (id) => {
        setTodos((prevTodo) => todos.filter((prevTodos) => prevTodos.id != id));
    }

    let updateAllTasks = () => {
        setTodos(
            todos.map((todo) => {
                return {
                    ...todo,
                    task: todo.task.toUpperCase()
                };
            })
        )

    }

    let updateTodo = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    task: todo.task.toUpperCase()
                };
            }
            else {
                return todo;
            }
        })
        )
    }

    let completedTodo = (id) => {
        setTodos((prevTodos) => prevTodos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    done: true
                };
            }
            else {
                return todo;
            }
        })
        )
    }
    return (
        <div className="body">

            <div>
                <input type="text" placeholder="add a task" value={newTodo} onChange={updateTodoValue} />
                &nbsp;
                <button onClick={addNewTask} >add</button>
                <br></br>
                <br></br>
            </div>

            <div>
                <b>Tasks Todo</b>
                <hr />
            </div>

            <ul>
                {todos.map((todo, index) => (
                    <li key={todo.id}>
                        <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                            {`${index + 1}. ${todo.task}`}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => deleteTodo(todo.id)}>delete</button>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => updateTodo(todo.id)}>update</button>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => completedTodo(todo.id)}>done</button>

                    </li>
                ))}
            </ul>
            <div className="update-button">
                <button onClick={updateAllTasks}>Update All Tasks</button>
            </div>
        </div>
    );
}
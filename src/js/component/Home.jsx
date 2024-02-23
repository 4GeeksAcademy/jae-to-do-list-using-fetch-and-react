import React, { useState } from "react";
import Fetch from "./Fetch";
import { addTaskToApi, deleteTaskFromApi } from "./UpdateAPI";



// Create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleDelete = index => {
		const updatedTodos = todos.filter((todo, i) => index !==i);
		setTodos(updatedTodos);
		deleteTaskFromApi (updatedTodos, setTodos);
	};


	const handleKeyDown = e => {
		if (e.keyCode === 13 && inputValue.trim() !== "") {
			// Check if the pressed key is Enter and inputValue is not empty
			setTodos([...todos, inputValue.trim()]); // Add trimmed inputValue to todos
			addTaskToApi(todos, inputValue, setTodos); // Pass on todos, inputValue, and setTodos to addTaskToApi in UpdateApi.jsx

			setInputValue(""); // Clear inputValue after adding todo
		}
	};

	const handleCleanAllTasks = () => {
		setTodos([]);
		deleteTaskFromApi([], setTodos);
	};


	return (
		<div className="container">
			<h1 className="mt-5 mb-5" >todos</h1>
			<div className="card todo-card" style={{ maxWidth: "800px" }}>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<input
							type="text"
							onChange={e => setInputValue(e.target.value)}
							value={inputValue}
							onKeyDown={handleKeyDown} // Use handleKeyDown function
							placeholder="What needs to be done?"
						/>
					</li>
					{todos.length === 0 ? (
						<li className="list-group-item no-tasks">No tasks, add a task</li>
					) : (
						todos.map((todo, index) => (
							<li key={todo.id} className=" list-group-item todo-item">
								<span className="todo">{todo.label}</span>
								<div className="x-container" onClick={() => handleDelete(index)}>
									<span className="x">
										<i className="fa-solid fa-x"></i>
									</span>
								</div>
							</li>
						))
					)}
				</ul>
				<div className="card-footer">{todos.length} items left</div>
				<button className="btn btn-danger btn-sm mt-3 rounded-0 " onClick={handleCleanAllTasks}>
					Clean All Tasks
				</button>
				<Fetch setTodos={setTodos} />
			</div>
		</div>
	);
};

export default Home;

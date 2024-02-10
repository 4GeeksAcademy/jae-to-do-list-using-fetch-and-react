import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// Create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const handleDelete = index => {
		setTodos(todos.filter((_, i) => i !== index));
	  };
	  
	const handleKeyDown = e => {
		if (e.keyCode === 13 && inputValue.trim() !== "") {
			// Check if the pressed key is Enter and inputValue is not empty
			setTodos([...todos, inputValue.trim()]); // Add trimmed inputValue to todos
			setInputValue(""); // Clear inputValue after adding todo
		}
	};

	return (
		<div className="container">
			<h1>My To Do's</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={handleKeyDown} // Use handleKeyDown function
						placeholder="What needs to be done?"
					/>
				</li>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo}
						<button onClick={() => handleDelete(index)}>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;

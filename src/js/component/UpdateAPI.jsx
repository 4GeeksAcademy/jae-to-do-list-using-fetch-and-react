import { fetchTodos } from "./Fetch";
export const addTaskToApi = (todos, inputValue, setTodos) => {
    const updateTodos = [
        ...todos, {
            id: Date.now(),
            label: inputValue.trim(),
            done: false,
        },
    ];

    fetch("https://playground.4geeks.com/apis/fake/todos/user/jae", {
        method: "PUT",
        body: JSON.stringify(updateTodos),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (resp.ok) {
                setTodos(updateTodos);
                fetchTodos(setTodos);
            }
        })
        .catch((error) => console.error("Error adding task to API:", error));
};



export const deleteTaskFromApi = (updatedTodos, setTodos) => {
    const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/jae";
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
            "Content-Type": "application/json"
        },
    };
//Delete user when there is less than 1 "to-do"
    if (updatedTodos.length < 1) {
        requestOptions.method = "DELETE";
        delete requestOptions.body;
    }

    fetch(apiUrl, requestOptions)
        .then((resp) => {
            if (resp.ok) {
                if (requestOptions.method === "DELETE") {
                    console.log("Todos and user successfully deleted from API.");
                } else {
                    console.log("Todo deleted successfully from API");
                    fetchTodos(setTodos);
                }

            } else {
                console.error("Failed to delete todo(s) from API");
            }
        })
        .catch((error) => console.error("Error deleting task from API:", error));
};
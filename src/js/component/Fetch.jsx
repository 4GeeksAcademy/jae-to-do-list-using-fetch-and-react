import React, { useEffect, useState } from "react";

export const fetchTodos = (setTodos) => {

    fetch('https://playground.4geeks.com/apis/fake/todos/user/jae')
       
        .then((resp) => {
            if (!resp.ok){
                throw new Error("Failed to fetch todo list. Status: " + resp.status);

            }
            return resp.json();
        })
        .then ((data)=> {
            setTodos(data)
            
        })

        .catch((error) => {
            console.error(error,"Unable to fetch operation")
        });

            
    };

// Initial fetch with an effect to make sure the initial fetch only runs once at the beginning

    const Fetch = ({ setTodos }) => {
        const [initialFetchDone, setInitialFetchDone] = useState(false);
    
        useEffect(() => {
            if (!initialFetchDone) {
                fetchTodos(setTodos);
                setInitialFetchDone(true);
            }
        }, [setTodos, initialFetchDone]);
    
    
        return null;
    };
    
    
    export default Fetch;
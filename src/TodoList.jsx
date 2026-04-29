    import { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
 function handleAdd() {
    if (input.trim() === '') return; // Nu adauga text gol
    setTodos([...todos, input]); // Creeaza array NOU cu tot ce era + input
    setInput(''); // Goleste input-ul
 }

 function handleDelete(index) {
    setTodos(todos.filter(function(_, i) {
    return i !== index;
    }));
}

 return (
    <div>
    <h3>Todo List</h3>
    <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adauga un task..."
 />
    <button onClick={handleAdd}>Adauga</button>
 {/* TODO: Afisati lista de todos cu map() */}


        <ul>
        {todos.map((todo, index) => (
                
                <li key={index}>{todo} <button onClick={() => handleDelete(index)}>Sterge</button>
                </li>

            ))}
        
       
        
        </ul>

     </div>
 );
}
export default TodoList;
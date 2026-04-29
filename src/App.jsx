import Card from './Card';
import React, { useState } from 'react';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';


function App() {

    const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
  ];

  

    const [count, setCount] = useState(0);
    

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Oltei Filip</p>

      <div>

        <p>Ai apasat de {count} ori</p>

        <button onClick={() => setCount(count + 1)}>Click</button>

      </div>

      <QuickNote/>

      <TodoList/>

      <ContactForm/>
      
      {projects.map(function(item, index) {
        return (

          <Card 
            key={index} 
            title={item.title} 
            description={item.description} 

            
          />
        );
      })}

      

    </div>

 );


}



export default App


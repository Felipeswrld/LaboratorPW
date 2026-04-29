
    import { useState } from 'react';

function ContactForm() {
  // 1. Definim state-urile pentru fiecare câmp
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // State pentru mesajul de feedback
  const [feedback, setFeedback] = useState('');

  // 2. Funcția care gestionează trimiterea formularului
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne reîncărcarea paginii

    // Verificăm dacă vreun câmp este gol (folosim .trim() pentru a ignora spațiile goale)
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setFeedback('Completeaza toate campurile!');
    } else {
      setFeedback('Multumim, ' + name + '!');
      
      // Opțional: Putem goli câmpurile după o trimitere cu succes
      // setName('');
      // setEmail('');
      // setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Contact</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Input controlat pentru Nume */}
        <div>
          <label htmlFor="name">Nume:</label><br />
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%' }}
          />
        </div>

        {/* Input controlat pentru Email */}
        <div>
          <label htmlFor="email">Email:</label><br />
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%' }}
          />
        </div>

        {/* Textarea controlat pentru Mesaj */}
        <div>
          <label htmlFor="message">Mesaj:</label><br />
          <textarea 
            id="message"
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows="4"
            style={{ width: '100%' }}
          />
        </div>

        {/* Butonul de Submit */}
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Trimite
        </button>

      </form>

      {/* Afișarea condiționată a feedback-ului */}
      {feedback && (
        <p style={{ 
          marginTop: '15px', 
          fontWeight: 'bold', 
          color: feedback.includes('Completeaza') ? 'red' : 'green' 
        }}>
          {feedback}
        </p>
      )}
    </div>
  );
}

export default ContactForm;
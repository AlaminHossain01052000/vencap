import { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openApiKey = "Enter api key here";

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // or the model you have access to
          messages: [...messages, userMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${openApiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      const aiMessage = response.data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      <button className="chat-toggle-button" onClick={toggleChat}>
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-envelope"></i>}
      </button>
      {isOpen && (
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
          {loading && <div className="message ai">Thinking...</div>}
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask for business and investment advice..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios using `npm install axios`
import FormData from "form-data";
// import fs from "node:fs";

function Tips() {
  const [inputText, setInputText] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newText = inputText;
    setInputText(''); // Clear input field after submission

    const formData = {
      prompt: newText,
      output_format: "webp"
    };
  
    try {
      const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/core`,
      axios.toFormData(formData, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: { 
          Authorization: `Bearer insert-your-api-key-here`, 
          Accept: "image/*" 
        },
      },
    );
  
      const blob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust MIME type as necessary
      const imageUrl = URL.createObjectURL(blob);
  
      const newEntry = {
        text: newText,
        imageUrl: imageUrl // URL created from Blob
      };
      setEntries([...entries, newEntry]); // Append new entry to the list
    } catch (error) {
      console.error('Error fetching image:', error);
      // Even if the image fetch fails, append the text
      setEntries([...entries, { text: newText, imageUrl: '' }]);
    }
  };
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text here"
          />
          <button type="submit">Submit</button>
        </form>
      </header>
      <hr />
      <div>
        {entries.map((entry, index) => (
          <div key={index}>
            <p></p>
            <p>{entry.text}</p>
            <p></p>
            {entry.imageUrl && <img src={entry.imageUrl} height={'300px'} width={'500px'} alt="From API" />}
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;

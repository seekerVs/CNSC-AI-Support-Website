const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const form = document.getElementById('chat-form');

    async function sendMessage() {
      if (!userInput.value) {
        return;
      }
    
      const userMessage = userInput.value.trim();
      userInput.value = '';
    
      console.log(typeof userMessage);
      console.log(userMessage);
    
      try {
        const response = await fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput: userMessage }),
        });
    
        const data = await response.json();
        console.log(data);
        const botMessage = data.response;
        console.log(typeof botMessage);

        chatHistory.innerHTML += `
          <div class="user-message">${userMessage}</div>
          <div class="bot-message">${botMessage}</div>
        `;
    
        // Scroll to the bottom of the chat history
        chatHistory.scrollTop = chatHistory.scrollHeight;
      } catch (error) {
        console.error('Error:', error);
      }
    }
    

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
      const loader = document.getElementById('loader');
      loader.style.display = 'block'; // Show the loader
      sendMessage().finally(() => {
      loader.style.display = 'none'; // Hide the loader after the message is sent
    });;
    });
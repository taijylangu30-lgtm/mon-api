const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');
const latencyText = document.getElementById('latency-text');
const uptimeText = document.getElementById('uptime-text');
const modelText = document.getElementById('model-text');

// Charger les infos de statut au démarrage
async function fetchStatus() {
  try {
    const res = await fetch('/status');
    const data = await res.json();
    uptimeText.textContent = data.uptime;
    modelText.textContent = data.model;
  } catch (e) {
    console.error('Erreur status:', e);
  }
}
setInterval(fetchStatus, 5000);
fetchStatus();

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const messageText = userInput.value.trim();

  // Ajouter le message utilisateur dans le DOM
  appendMessage(messageText, 'user-message');
  userInput.value = '';
  
  // Afficher l'indicateur de frappe
  typingIndicator.classList.remove('hidden');
  scrollToBottom();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });

    const data = await response.json();
    
    typingIndicator.classList.add('hidden');
    appendMessage(data.message, 'ai-message');
    
    if (data.responseTime) {
      latencyText.textContent = data.responseTime;
    }
  } catch (error) {
    typingIndicator.classList.add('hidden');
    appendMessage('Une erreur de connexion est survenue avec les serveurs d\'Aether.', 'ai-message');
  }
});

function appendMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'bubble';
  bubbleDiv.textContent = text;
  
  messageDiv.appendChild(bubbleDiv);
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

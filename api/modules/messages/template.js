function messageTemplate(message) {
  const { id, text, author, datetime } = message;
	return `
    <li class="message">
      <p>${text}</p>
      <div class="info-row">
        <h5>${author}</h5>
        <h6>${datetime}</h6>
      </div>
      <button class="cross" onclick="deleteMessage(${id})">&times;</button>
    </li>
  `;
}

module.exports = messageTemplate;
const ENDPOINT = "/api/message";

const messageForm = document.querySelector("#messageForm");

messageForm.addEventListener("submit", addMessage);

function addMessage(event) {
	event.preventDefault();
	const data = Object.fromEntries(new FormData(messageForm));
	const body = JSON.stringify(data);
	fetch(ENDPOINT, { method: "POST", body }).then((response) => {
		if (response.ok) {
			location.reload();
		} else {
			console.error("An error occured.");
		}
	});
}

function deleteMessage(id) {
	const body = JSON.stringify({ id });
	fetch(ENDPOINT, { method: "DELETE", body }).then((response) => {
		if (response.ok) {
			location.reload();
		} else {
			console.error("An error occured.");
		}
	});
}

let timer = null;

export function showNotification(message, type = "success") {

    const container = document.getElementById("notification");

    container.innerHTML = `
        <div class="alert alert-${type} shadow">
            ${message}
        </div>
    `;

    clearTimeout(timer);

    timer = setTimeout(() => {

        container.innerHTML = "";

    }, 3000);

}
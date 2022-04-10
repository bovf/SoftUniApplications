function getInfo() {
    const ul = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    makeRequest(url);

    const nameElement = document.getElementById('stopName');
    nameElement.textContent = `Loading...`;
    async function makeRequest(url) {
        try{
            const response = await fetch(url);

            if (response.status !== 200) {
                throw new Error ("Stop ID not Found");
            }

            handleResponse(response);
        } catch (error) {

            handleError(error);
        }
    }

    async function handleResponse(response) {
        const data = await response.json();
        const stopName = data.name;
        const nameElement = document.getElementById('stopName');
        nameElement.textContent = stopName;
        ul.replaceChildren();
        for (const bus of Object.entries(data.buses)) {
            const li = document.createElement('li');
            li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            ul.appendChild(li);

        }
    }
    
    function handleError (error) {
        ul.replaceChildren();
        const stopName = document.getElementById('stopName');
        stopName.textContent = error.message;
    }
}
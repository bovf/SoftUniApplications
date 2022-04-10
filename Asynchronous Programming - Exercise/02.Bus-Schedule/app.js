function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const infoBox = document.getElementById('info');

    arriveBtn.disabled = true;

    let stop = {
        name: "Depot",
        next: "0361"
    }
    async function depart() {
        departBtn.disabled = true;
        infoBox.textContent = `Next stop ${stop.name}`;
        // console.log(stop);
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const response = await fetch(url);
        stop = await response.json();
        // console.log(stop);
        arriveBtn.disabled = false;
    }

    function arrive() {
        arriveBtn.disabled = true;
        infoBox.textContent = `Arriving at ${stop.name}`;
        // console.log(stop);
    
        // console.log(stop);
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
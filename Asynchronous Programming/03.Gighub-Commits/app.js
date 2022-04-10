function loadCommits() {
    const repo = document.getElementById('repo').value;
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const ul = document.getElementById('commits');
    
    makeRequest(url);

    async function makeRequest(url) {
        try {
            const response = await fetch(url);
            if (response.ok === false) {
                throw new Error (`Error: ${response.status} (${response.statusText})`);
            }
            handleResonse(response)
        } catch (error) {
            handleError(error);
        }
    }
    
    async function handleResonse(response) {
        let commits = await response.json();
        ul.innerHTML = '';
        for (const commit of commits) {
            const li = document.createElement('li');
            li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            ul.appendChild(li);
        }


    }

    function handleError (error) {
        ul.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = error.message;
        ul.appendChild(li);
    }
}
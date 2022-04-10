function loadRepos() {
	const list = document.getElementById('repos');
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then(response => {
		if (response.ok === false) {
			throw new Error (`${response.status} ${response.statusText}`);
		}
		return response.json();
	})
	.then(handleResponse)
	.catch(handleError);

	function handleResponse(data) {
		list.innerHTML = '';
		for (const repo of data) {
			console.log(repo.full_name, repo.html_url);
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.href = (`${repo.html_url}`);
			a.textContent = `${repo.full_name}`;
			li.appendChild(a);
			list.appendChild(li);
		}
	}

	function handleError(error) {
		list.innerHTML = '';
		list.textContent = `${error.message}`;
	}
}
function loadRepos() {
   const button = document.querySelector('button');
   let text = '';
   let parent = button.parentElement;
   // console.log(parent);
   let b = fetch('https://api.github.com/users/testnakov/repos')
   .then(response => response.json())
   .then(data => {
      text = JSON.stringify(data);
      return JSON.stringify(data);
   });
   
   b.catch(() => {
      let a = document.createElement('a');
      a.textContent = 'Error';
      parent.parentElement.appendChild(a);
   })
   b.then(() => {
      let a = document.createElement('a');
      a.textContent = text;
      parent.parentElement.appendChild(a);
   })

}
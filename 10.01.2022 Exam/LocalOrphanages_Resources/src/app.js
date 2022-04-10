
import {render } from './lib.js';
import { page } from './lib.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { getUserData } from './util.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext)
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/profile', profilePage);

// testt data
// const userData = {
//     "email": "john@abv.bg",
//     "_id": "847ec027-f659-4086-8032-5173e2f9c93a",
//     "accessToken": "0d4f07ad08ad1c8f84d7b331c512b7e5aad26b21037e52a92b187c8540bcdfd6"
// }

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/')
}

function updateUserNav() {
    const userData = getUserData();

    if(userData) {
        document.querySelector('#user').style.display = "block";
        document.querySelector('#guest').style.display = "none";
    } else {
        document.querySelector('#guest').style.display = "block";
        document.querySelector('#user').style.display = "none";
    }
}
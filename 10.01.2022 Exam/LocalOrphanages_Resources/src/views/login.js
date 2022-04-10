import {html} from '../lib.js';
import { login } from '../api/api.js';
import { notify } from '../notify.js';

const loginTemplate = (onSubmit) => html`
<section id="login-page" class="auth">
    <form @submit=${onSubmit} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>`;


export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        
        const email = formData.get('email');
        const password = formData.get('password');

        if(email == '' || password == '') {
            return notify('All fields are required!');
        }
    
    
        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}



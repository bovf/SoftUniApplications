import { getMyPosts } from '../api/data.js';
import {html} from '../lib.js';
import { getUserData } from '../util.js';

const profileTemplate = (posts) => html`
        <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
        ${posts.length == 0 
            ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
            : getAllMyPosts(posts)}
        `;


const postCard = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>`;

function getAllMyPosts(postCards) {
    return html`
    <div class="my-posts">
        ${postCards.map(postCard)}
    </div>`
}

export async function profilePage(ctx) {
    const userData = getUserData();
    const posts = await getMyPosts(userData.id);
    ctx.render(profileTemplate(posts, userData));
}
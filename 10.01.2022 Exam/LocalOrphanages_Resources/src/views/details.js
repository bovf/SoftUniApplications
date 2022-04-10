import {html} from '../lib.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../util.js';





const detailsTemplate = (post, isOwner, onDelete) => html`
<section id="details-page">
        <h1 class="title">Post Details</h1>
            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${post.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${post.title}</h2>
                        <p class="post-description">Description: ${post.description}</p>
                        <p class="post-address">Address: ${post.address}</p>
                        <p class="post-number">Phone number: ${post.phone}</p>
                        <p class="donate-Item">Donate Materials: 0</p>

                        <!--Edit and Delete are only for creator-->
                        <div class="btns">
                        ${isOwner ? 
                            html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                            <button @click="${onDelete}" class="delete-btn btn">Delete</button>`
                            : null}
                        </div>

                    </div>
                </div>
            </div>
        </section>`;

// const detailsTemplate = (meme, isOwner, onDelete) => html`
// <section id="meme-details">
//             <h1>Meme Title: ${meme.title}</h1>
//             <div class="meme-details">
//                 <div class="meme-img">
//                     <img alt="meme-alt" src="${meme.imageUrl}">
//                 </div>
//                 <div class="meme-description">
//                     <h2>Meme Description</h2>
//                     <p>${meme.description}</p>
//                     ${isOwner ? 
//                     html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
//                     <button @click="${onDelete}" class="button danger">Delete</button>`
//                     : null}
//                 </div>
//             </div>
//         </section>`;


export async function detailsPage(ctx) {
    const post = await getById(ctx.params.id);
    
    const userData = getUserData();
    const isOwner = userData && post._ownerId == userData.id;
    
    
    ctx.render(detailsTemplate(post, isOwner, onDelete));

    async function onDelete(event) {
        
        const choice = confirm('Are you sure you want to delete?');

        if(choice) {
           await deleteById(ctx.params.id);
           ctx.page.redirect('/')
        }


    }
    
}



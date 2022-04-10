import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;


export async function getAllPosts() {
    return api.get('/data/posts?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return api.get('/data/posts/' + id);
}

export async function getMyPosts(userId) {
    return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


export async function createPost(post) {
    return api.post('/data/posts', post);
}

export async function deleteById(id) {
    return api.del('/data/posts/' + id);
}

export async function editPost(id, post) {
    return api.put('/data/posts/' + id, post)

}
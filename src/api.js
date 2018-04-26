const { BACKEND_URL } = process.env

const api = `${BACKEND_URL}/api`;

export const listTasksUrl = id => `${api}/todolists/${id}/`;
export const listsUrl = `${api}/todolists/`;
export const taskUrl = id => `${api}/todos/${id}/`;
export const tasksUrl = `${api}/todos/`;

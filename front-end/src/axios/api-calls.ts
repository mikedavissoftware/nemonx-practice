import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  withCredentials: false,
})

// =======================
// MAIN ROUTES
// =======================
export const testConnection = () => API.get("/users");
export const dbCreate = () => API.get("/api/db_create");
export const dbDrop = () => API.get("/api/db_drop");

// =======================
// USER ROUTES
// =======================
export const getUsers = () => API.get("/users");
export const getUser = (userId) => API.get(`/users/${userId}`);
export const createUser = (userData) => API.post("/users", userData);
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);

// =======================
// TASK ROUTES
// =======================
export const getTasks = () => API.get("/tasks");
export const getTask = (taskId) => API.get(`/tasks/${taskId}`);
export const createTask = (taskData) => API.post("/tasks", taskData);
export const updateTask = (taskId, taskData) => API.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);

// Export the Axios instance if needed
export default API;
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Register a new user
 * @param {Object} userData - { full_name, email, password }
 */
export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }
    return data;
};

/**
 * Log in an existing user
 * @param {Object} userData - { email, password }
 */
export const loginUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }
    return data;
};

// LocalStorage helpers
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Auth Header helper
const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

/**
 * Fetch all tasks for current user
 */
export const getTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tasks');
    }
    return data;
};

/**
 * Create a new task
 * @param {Object} taskData - { title, description, stage }
 */
export const createTask = async (taskData) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to create task');
    }
    return data;
};

/**
 * Update an existing task
 * @param {string|number} id - Task ID
 * @param {Object} taskData - { title, description, stage }
 */
export const updateTask = async (id, taskData) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to update task');
    }
    return data;
};

/**
 * Delete an existing task
 * @param {string|number} id - Task ID
 */
export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to delete task');
    }
    return data;
};

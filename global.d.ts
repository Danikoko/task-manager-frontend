declare module 'qz-tray';

// Declare a global User type
declare interface User {
    id: number,
    name: string,
    email: string
}

// Declare a global Profile type
declare interface Profile {
    id: number,
    first_name: string,
    last_name: string,
    gender: string,
    phone: string,
    image: string
}

// Declare a global Category type
declare interface Category {
    id: number,
    name: string,
    description: string,
    created_at: string
}

// Declare a global Task type
declare interface Task {
    id: number,
    category_id: number,
    category_name: string,
    title: string,
    description: string,
    due_date: string,
    is_completed: boolean,
    created_at: string,
}
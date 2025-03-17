const BASE_URL = 'http://localhost:8000'

export const URLs = (id: number | null = null) => ({
    TASK_DOCUMENT: BASE_URL + `/api/tasks/${id}`,
    TASK_COLLECTION: BASE_URL + `/api/tasks`  
});

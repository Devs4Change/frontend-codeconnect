import { apiClient } from "./config";


export const apiGetCourses = async () => apiClient.get("/courses")

export const apiAddCourses = async () => apiClient.post("/courses", payload)

export const apiGetSingleCourse = async (id) => apiClient.get(`/courses/${id}`)

export const apiUpdateCourses = async (id, payload) => {
 
    const ad = await apiClient.patch(`/courses/${id}`, payload)
 
    return ad
}

export const apiDelCourses = async (id) => apiClient.delete(`/courses/${id}`)
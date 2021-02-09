import * as axios from 'axios'

const baseURL = "http://localhost:8080/api"

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use(request => {
    // console.log('request: ',request.method +' '+ request.baseURL + request.url, request.data)
    return request
}, error => {
    // console.log('error interceptor', error)
})

export const markersAPI = {
    async getMarkersData() {
        try {
            const response = await axiosInstance.get(
                `/markers`
            )
            return response
        } catch (e) {
            // console.log('response error enter', e)
            return { Messages: "Server non risponde. Prova pui' tardi" };
        }
    },

    async updateMarkersData(markerData) {
        try {
            const response = await axiosInstance.put(
                `/updateMarkers`, markerData
            )
            return response
        } catch (e) {
            // console.log('response error enter', e)
            return { Messages: "Server non risponde. Prova pui' tardi" };
        }
    },

    async addMarkersData(markerData) {
        try {
            const response = await axiosInstance.post(
                `/addMarkers`, markerData
            )
            return response
        } catch (e) {
            // console.log('response error enter', e)
            return { Messages: "Server non risponde. Prova pui' tardi" };
        }
    },

    async deleteMarker(markerId) {
        try {
            const response = await axiosInstance.delete(
                `/deleteMarker/${markerId}`
            )
            return response
        } catch (e) {
            // console.log('response error enter', e)
            return { Messages: "Server non risponde. Prova pui' tardi" };
        }
    }
}


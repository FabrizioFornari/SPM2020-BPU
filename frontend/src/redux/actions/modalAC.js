import * as actionTypes from './actionTypes';
import { markersAPI } from '../../backendApi/api/api';
import {message } from "antd"

export const modalOpenAC = (userData) => {
    return {
        type: actionTypes.MODAL_OPEN,
        userData
    }
}

export const modalCloseAC = (error) => {
    return {
        type: actionTypes.MODAL_CLOSE,
        error
    }
}

export const modalchangeStartDateAC = (userData) => {
    return {
        type: actionTypes.MODAL_STARTDATE,
        userData
    }

}

export const modalchangeEndDateAC = (userData) => {
    return {
        type: actionTypes.MODAL_ENDDATE,
        userData
    }

}

export const modalchangeCostAC = (userData) => {
    return {
        type: actionTypes.MODAL_COST,
        userData
    }
}
export const menuChangeKeyAC = (menuData) => {
    return {
        type: actionTypes.MENU_KEY,
        menuData
    }
}


export const setMarkersAC = (markerData) => {
    return {
        type: actionTypes.MARKER_DATA,
        markerData
    }
}


export const markerFetchDataAC = () => {
    console.log(" markerFetchDataAC is called")
    return async dispatch => {
        const response = await markersAPI.getMarkersData()
        // console.log('response from getUserRole', response)
		if (response.status === 200) {
            dispatch(setMarkersAC(response.data))
		}
    }
}


export const markerEditDataAC = (markerData) => {
    console.log(" markerEditDataAC is called")
    return async dispatch => {
        const response = await markersAPI.updateMarkersData(markerData)
        // console.log('response from getUserRole', response)
		if (response.status === 200) {
            message.success("Parking lot updated!")
            dispatch(setMarkersAC(response.data))
		}
    }
}

export const markerAddAC = (markerData) => {
    console.log(" markerAddAC is called")
    return async dispatch => {
        const response = await markersAPI.addMarkersData(markerData)
        // console.log('response from getUserRole', response)
		if (response.status === 200) {
            message.success("Parking lot added!")
            dispatch(setMarkersAC(response.data))
		}
    }
}

export const markerDeleteAC = (markerId) => {
    console.log(" markerDeleteAC is called")
    console.log(markerId)
    return async dispatch => {
        const response = await markersAPI.deleteMarker(markerId)
        // console.log('response from getUserRole', response)
		if (response.status === 200) {
            message.success("Parking lot deleted!")
            dispatch(markerFetchDataAC())
		}
    }
}


export const setCurrentLocationAC = (currentLocation) => {
    return {
        type: actionTypes.CURRENT_LOCATION,
        currentLocation
    }

}

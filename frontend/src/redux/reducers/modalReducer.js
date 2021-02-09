import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

const initialState = {
    isModalVisible: false,
    startDate: moment(),
    endDate: moment(),
    cost: 0,
    selectedKeys: "1",
    markersData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MODAL_OPEN:
            return {
                ...state,
                isModalVisible: true,
            }
        case actionTypes.MODAL_CLOSE:
            return {
                ...state,
                isModalVisible: false,
            }
        case actionTypes.MODAL_STARTDATE:
            return {
                ...state,
                startDate: action.userData,
            }
        case actionTypes.MODAL_ENDDATE:
            return {
                ...state,
                endDate: action.userData,
            }
        case actionTypes.MODAL_COST:
            return {
                ...state,
                cost: action.userData,
            }
        case actionTypes.MENU_KEY:
            return {
                ...state,
                selectedKeys: action.menuData,
            }

        case actionTypes.MARKER_DATA:
            return {
                ...state,
                markersData: action.markerData,
            }
        default:
            return state
    }
}

export default reducer
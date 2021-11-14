import { createStore, reducer } from "easy-peasy";
import {usersModel} from './models/usersModel'
import {reservationModel} from './models/reservationModel'
import modalReducer  from "./reducers/modalReducer";

const storeModel = {
    modalMarker: reducer(modalReducer),
    users: usersModel,
    reservations: reservationModel,
  };
  
  export const store = createStore(storeModel);

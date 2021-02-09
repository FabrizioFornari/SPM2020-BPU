import { action, thunk } from "easy-peasy";
import { reservationsAPI } from "../../services/api";

export const reservationModel = {
  loading: false,
  reservationsData: [],
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  populateReservationsData: action((state, payload) => {
    state.reservationsData = payload;
    state.loading = false;
  }),
  deleteReservationsData: action((state, payload) => {
    state.userData = [];
  }),
  fetchReservations: thunk(async (actions, reservationsData) => {
    await actions.setLoading(true);
    const response = await reservationsAPI.getReservationsData();
    if (response.status === 200) {
      await actions.populateReservationsData(response.data);
    }
  }),
  saveReservation: thunk(async (actions, reservationsData) => {
    const creationFeedback = await reservationsAPI.saveReservation(reservationsData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
    }
  }),
  editReservation: thunk(async (actions, reservationsData) => {
    const creationFeedback = await reservationsAPI.editReservation(reservationsData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
      await actions.fetchReservations();

    }
  }),
  deleteReservation: thunk(async (actions, id) => {
    const deletionFeedback = await reservationsAPI.deleteReservation(id);
    if (deletionFeedback.status === 200) {
      await actions.fetchReservations();
    }
  }),
};


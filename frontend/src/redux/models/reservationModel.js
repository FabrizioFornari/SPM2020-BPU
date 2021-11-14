import { action, thunk } from "easy-peasy";
import { reservationsAPI } from "../../services/api";

export const reservationModel = {
  loading: false,
  reservationsData: [],
  parkingViolationData: [],
  allParkingViolationsData: [],
  nrParkingViolations: 0,
  nrOfAllParkingViolations: 0,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  populateReservationsData: action((state, payload) => {
    state.reservationsData = payload;
    state.loading = false;
  }),
  populateParkingViolationData: action((state, payload) => {
    state.parkingViolationData = payload;
    state.loading = false;
  }),
  populateAllParkingViolationData: action((state, payload) => {
    state.allParkingViolationsData = payload;
    state.loading = false;
  }),
  setNrOfParkingViolations: action((state, payload) => {
    state.nrParkingViolations = payload;
  }),
  setNrOfAllParkingViolations: action((state, payload) => {
    state.nrOfAllParkingViolations = payload;
  }),
  deleteReservationsData: action((state, payload) => {
    state.userData = [];
  }),
  fetchReservations: thunk(async (actions, email) => {
    await actions.setLoading(true);
    const response = await reservationsAPI.getReservationsData(email);
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
      await actions.fetchReservations(reservationsData.email);

    }
  }),
  deleteReservation: thunk(async (actions, reservationData) => {
    const deletionFeedback = await reservationsAPI.deleteReservation(reservationData.id);
    if (deletionFeedback.status === 200) {
      await actions.fetchReservations(reservationData.email)
    }
  }),

  enter: thunk(async (actions, reservationsData) => {
    const creationFeedback = await reservationsAPI.enter(reservationsData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
      await actions.fetchReservations(reservationsData.email);

    }
  }),

  exit: thunk(async (actions, reservationsData) => {
    const creationFeedback = await reservationsAPI.exit(reservationsData);
    //const history = useHistory();
    if (creationFeedback.status === 200) {
      await actions.fetchReservations(reservationsData.email);
      await actions.fetchNrOfParkingViolations(reservationsData.email);
      await actions.fetchNrOfAllParkingViolations();
    }
  }),
  fetchParkingViolationData: thunk(async (actions, email) => {
    console.log("fetchParkingViolationData")
    console.log(email)
    await actions.setLoading(true);
    const response = await reservationsAPI.getParkingViolaitonsData(email);
    if (response.status === 200) {
      await actions.populateParkingViolationData(response.data);
    }
  }),

  fetchAllParkingViolationsData: thunk(async (actions, email) => {
    console.log("fetchParkingViolationData")
    console.log(email)
    await actions.setLoading(true);
    const response = await reservationsAPI.getAllParkingViolationsData();
    if (response.status === 200) {
      await actions.populateAllParkingViolationData(response.data);
    }
  }),

  fetchNrOfParkingViolations: thunk(async (actions, email) => {
    console.log("fetchNrOfParkingViolations")
    console.log(email)
    const response = await reservationsAPI.getNrOfParkingViolations(email);
    if (response.status === 200) {
      await actions.setNrOfParkingViolations(response.data);
    }
  }),

  updateSeenDriverFine: thunk(async (actions, userData) => {
    console.log("updateSeenDriverFine")
    console.log(userData.email)
    const response = await reservationsAPI.updateSeenDriverFine(userData);
    if (response.status === 200) {
      await actions.fetchNrOfParkingViolations(userData.email);
    }
  }),

  updateSeenAdminFine: thunk(async (actions, userData) => {
    console.log("updateSeenAdminFine")
    const response = await reservationsAPI.updateSeenAdminFine();
    if (response.status === 200) {
      await actions.fetchNrOfAllParkingViolations();
    }
  }),

  fetchNrOfAllParkingViolations: thunk(async (actions, email) => {
    console.log("fetchNrOfAllParkingViolations")
    const response = await reservationsAPI.getNrOfAllParkingViolations();
    if (response.status === 200) {
      await actions.setNrOfAllParkingViolations(response.data);
    }
  }),

  deleteParkingViolation: thunk(async (actions, id) => {
    const deletionFeedback = await reservationsAPI.deleteParkingViolation(id);
    if (deletionFeedback.status === 200) {
      await actions.fetchAllParkingViolationsData();
    }
  }),

  updateParkingViolation: thunk(async (actions, parkingViolationData) => {
    const deletionFeedback = await reservationsAPI.updateParkingViolation(parkingViolationData);
    if (deletionFeedback.status === 200) {
      await actions.fetchAllParkingViolationsData();
    }
  }),

};


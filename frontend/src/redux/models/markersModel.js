import { action, thunk } from "easy-peasy";
import { maerkersAPI } from "../../services/api";

export const markerModel = {
  loading: false,
  markersData: [],
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  populateMarkersData: action((state, payload) => {
    state.markersData = payload;
    state.loading = false;
  }),
  deleteMarkersData: action((state, payload) => {
    state.markersData = [];
  }),
  fetchMarkers: thunk(async (actions, maerkersData) => {
    await actions.setLoading(true);
    const response = await maerkersAPI.getMarkersData();
    if (response.status === 200) {
      await actions.populateMarkersData(response.data);
    }
  }),
};


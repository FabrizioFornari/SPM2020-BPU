import axios from "axios";
import {message } from "antd"

const axiosInstance = {
  users: axios.create({
    baseURL: "http://localhost:8081/api",

  }),
  reservations: axios.create({
    baseURL: "http://localhost:8081/api",

  }),
  markers: axios.create({
    baseURL: "http://localhost:8081/api",

  }),
};

axiosInstance.users.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      // console.log("error interceptor", error);
    }
);

export const usersAPI = {

  async getUsersData() {
    try {
      const response = await axiosInstance.users.get(`/users`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async saveUser(userData) {
    try {
      const response = await axiosInstance.users.post(`/save`, userData);
      message.success("User saved!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("User exist. Please check your data and try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },


  async editUser(userData) {
    try {
      const response = await axiosInstance.users.put(`/editUser`, userData);
      message.success("User updated!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("Sorry, there was an error to update the user. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },


  async changePassword(userData) {
    try {
      const response = await axiosInstance.users.put(`/changePassword`, userData);
      message.success("Password updated!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 422) {
        message.error("Sorry, there was an error to update the password. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },


  async checkUser(userData) {
    try {
      const response = await axiosInstance.users.post(`/login`, userData);
      message.success("Log in done!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 404) {
        message.error("Wrong Email or password. Please check your data and try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

};

export const reservationsAPI = {

  async getReservationsData(email) {
    try {
      const response = await axiosInstance.reservations.get(`/reservations/${email}`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async saveReservation(reservationData) {
    try {
      const response = await axiosInstance.reservations.post(`/reservate`, reservationData);
      message.success("Reservation done!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("Sorry, there was an error. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async editReservation(reservationData) {
    try {
      const response = await axiosInstance.reservations.put(`/editReservation`, reservationData);
      message.success("Reservation updated!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("Sorry, there was an error to update the reservation. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async deleteReservation(reservationId) {
    try {
      const response = await axiosInstance.reservations.delete(`/deleteReservation/${reservationId}`);
      message.success("Reservation cancelled!")
      return response;
    } catch (e) {
      message.error("An error occurred. Please try again later!")
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async enter(reservationData) {
    try {
      const response = await axiosInstance.reservations.put(`/enter`, reservationData);
      message.success("Enter done!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("Sorry, there was an error. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async exit(reservationData) {
    try {
      const response = await axiosInstance.reservations.put(`/exit`, reservationData);
      message.success("Exit done!")
      return { data: response.data, status: response.status };
    } catch (e) {
      console.log(e.response.status);
      if (e.response.status === 409) {
        message.error("Sorry, there was an error. Please try again later!")
      }
      else {
        message.error("Sorry, there was an error. Please try again later!")
      }
      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async getParkingViolaitonsData(email) {
    try {
      const response = await axiosInstance.reservations.get(`/parkingViolations/${email}`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async getNrOfParkingViolations(email) {
    try {
      const response = await axiosInstance.reservations.get(`/nrParkingViolations/${email}`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async updateSeenDriverFine(userData) {
    try {
      const response = await axiosInstance.reservations.put(`/updateSeenDriverFine`, userData);
      return { data: response.data, status: response.status };
    } catch (e) {

      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async updateSeenAdminFine() {
    try {
      const response = await axiosInstance.reservations.put(`/updateSeenAdminFine`);
      return { data: response.data, status: response.status };
    } catch (e) {

      return {
        status: 400,
        message: `Errore. Prova più tardi. ErrorMessage: ${e}`,
      };
    }
  },

  async getAllParkingViolationsData() {
    try {
      const response = await axiosInstance.reservations.get(`/allParkingViolations`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async getNrOfAllParkingViolations() {
    try {
      const response = await axiosInstance.reservations.get(`/nrOfAllParkingViolations`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

};




export const maerkersAPI = {

  async getMarkersData() {
    try {
      const response = await axiosInstance.markers.get(`/markers`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },


};
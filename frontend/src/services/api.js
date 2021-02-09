import axios from "axios";
import {message } from "antd"

const axiosInstance = {
  users: axios.create({
    baseURL: "http://localhost:8080/api",

  }),
  reservations: axios.create({
    baseURL: "http://localhost:8080/api",

  }),
  markers: axios.create({
    baseURL: "http://localhost:8080/api",

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
      message.success("User saved successfully!")
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
      message.success("User edit successfully!")
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
      message.success("Password updated successfully!")
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
      message.success("Log in done successfully!")
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
  
  async getReservationsData() {
    try {
      const response = await axiosInstance.reservations.get(`/reservations`);
      return { data: response.data, status: response.status };
    } catch (e) {
      // console.log("response error enter", e);
      return { Messages: "Server non risponde. Prova più tardi" };
    }
  },

  async saveReservation(reservationData) {
    try {
      const response = await axiosInstance.reservations.post(`/reservate`, reservationData);
      message.success("Reservation done successfully!")
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
      message.success("Reservation updated successfully!")
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
      message.success("Reservation cancelled successfully!")
      return response;
    } catch (e) {
      message.error("An error occurred. Please try again later!")
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
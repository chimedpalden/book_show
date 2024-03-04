import axios from "axios";

const booking = id =>
  axios.post("/api/bookings", {
    show_id: id,
  });

const cancel = (id) => axios.delete(`/api/bookings/${id}`);


const bookApi = {
  booking,
  cancel
};

export default bookApi;
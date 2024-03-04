import React, { useState, useEffect } from "react";
import { either, isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from "../utils/storage";
import moment from 'moment';
import bookApi from "../apis/booking";
// import Toastr from "../Common/Toastr";

const Booking = ({ movie, showModel }) => {
  const [loading, setLoading] = useState(false)
  const [showId, setShowId] = useState(movie.shows[0].id)
  const [vacancy, setVacancy] = useState(0)
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  useEffect(() => {
    const t_seats = movie.shows[0].total_seats
    setVacancy(t_seats - movie.shows[0].bookings.length)
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    // console.log(showId)
    setLoading(true);
    try {
      const { data: { seats, show: { datetime, movie: { title } } } } = await bookApi.booking(showId);
      setLoading(false);
      const slottime = moment.utc(datetime).format("MMMM Do YYYY, h:mm:ss a")
      showModel(title, slottime, seats[0].seat_number)
      // show

      // Toastr.success(response.data.notice);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShowId(e.target.value)
    const selectedShow = movie.shows.find(s => s.id == e.target.value)
    const t_seats = selectedShow.total_seats
    setVacancy(t_seats - selectedShow.bookings.length)
  }

  return (
    <>
      
      <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <label for="underline_select" class="sr-only">Show timings from dropdown</label>
        <select 
          id="underline_select"
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            {/* <option selected>Choose your timeslot</option> */}
            {movie.shows.map((show, index) => {
              return <option value={show.id}>{moment.utc(show.datetime).format("MMMM Do YYYY, h:mm:ss a")}</option>;
            })}
        </select>
        {isLoggedIn && <button
          type="submit"
          loading={loading}
          className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"}
        >
          {loading ? "Booking..." : "Book"}
        </button>}
        
      </form>
      
      <p>Only {vacancy} Seats are left: </p>

    </>
  )
}

export default Booking
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookApi from "../apis/booking";
import moment from 'moment';

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "/api/bookings";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        // console.log(res)
        setTickets(res)
        setLoading(false)
      })
      .catch((e) => {
        // console.log(e)
        navigate("/")
      });
  }, []);

  const handleClick = async (event, id) => {
    event.preventDefault();
    setLoading(true);
    console.log(id)
    try {
      const response = await bookApi.cancel(id);
      setTickets(oldTickets => {
        return oldTickets.filter(t => t.id !== id)
      })
      console.log(response)
      setLoading(false);
      // window.location.href = "/";
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      {tickets.map(({id, seats, show }, index) => {
        return (
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2>Booking successfull</h2>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{show.movie.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Timing: {moment.utc(show.datetime).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Seat Number: {seats[0].seat_number}</p>
            <button 
              onClick={(e) => handleClick(e, id)}
              data-modal-hide="popup-modal" 
              type="button" 
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Cancel Booking
            </button>
          </div>
        )
      })}
    </>
  )
}

export default Tickets
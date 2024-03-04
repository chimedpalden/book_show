import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from 'lodash';
import Booking from "./Booking";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([])
  const [showModal, setShowModal] = React.useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    time: "",
    seat: ""
  })

  useEffect(() => {
    const url = "/api/movies";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        // console.log(res)
        setMovies(res)
        setLoading(false)
      })
      .catch(() => navigate("/"));
  }, []);

  const notify = () => toast("Wow so easy!");

  const showModel = (title, slottime, seat_no) => {
    console.log(title, slottime, seat_no)
    setTicket({
      title: title,
      time: slottime,
      seat: seat_no
    })
    setShowModal(true)
  }

  return (
    <>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-2 mx-auto max-w-32">
              {/*content*/}
              <div className="border-0 rounded shadow relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-32 leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <p className="my-4 text-blueGray-200 text leading-relaxed">
                    Movie: {ticket.title}
                  </p>
                  <p className="my-4 text-blueGray-200 text leading-relaxed">
                    Timeing: {ticket.time}
                  </p>
                  <p className="my-4 text-blueGray-200 text leading-relaxed">
                    Seat No.: {ticket.seat}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div class="h-screen flex-grow-1 overflow-y-lg-auto">
        <main class="py-6 bg-surface-secondary">
          <div class="container-fluid">
            <div class="card shadow border-0 mb-7">
                <div class="card-header">
                    <h5 class="mb-0">Movies List</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {movies.map((movie, index) => {
                    return <li key={index} className="list-group-item pt-4 pb-4">
                      <div className="row">
                        <div className="col">
                          {movie.title} | {movie.genre.name}
                        </div>
                        <div className="col-5">
                          <Booking movie = {movie}
                          showModel={showModel} />
                        </div>
                      </div>
                    </li>
                  })}
                </ul>

                <div class="card-footer border-0 py-5">
                    <span class="text-muted text-sm">Showing all movies</span>
                </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

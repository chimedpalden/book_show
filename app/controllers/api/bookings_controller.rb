class Api::BookingsController < ApplicationController
  before_action :verify_token, only: [:create]

  def index
    # bookings = current_user.booking
    bookings = Booking.all
    render status: :ok, json: bookings, include: [:seats, :show => {:include => [:movie, :bookings]}]
  end

  def create
    # binding.break
    show = Show.find(params[:show_id])
    available_seat = show.seats.find_by(booked: false)
    if show && available_seat
      booking = Booking.create(user_id: current_user.id, show_id: show.id)
      available_seat.update(booked: true, booking_id: booking.id)
      # handle booking confirmation
      render status: :ok, json: booking, include: [:seats, :show => {:include => :movie}]
    else
      # handle no available seats
      render status: :ok, json: { notice: "no seats available" }
    end
  end

  def destroy
    booking = Booking.find(params[:id])
    booking.seats.update_all(booked: false, booking_id: nil)
    booking.destroy
    # handle cancellation confirmation
  end
end
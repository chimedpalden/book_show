class Api::MoviesController < ApplicationController
  def index
    movies = Movie.left_joins(:shows).where.not(shows: { id: nil }).group(:id).order(id: :asc)
    render json: movies, include: [:genre, :shows => {:include => :bookings}]
  end
end

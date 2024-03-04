class Api::ShowsController < ApplicationController
  def index
    @showtimes = Showtime.all
  end
end

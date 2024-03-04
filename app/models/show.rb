class Show < ApplicationRecord
  belongs_to :movie
  has_many :bookings
  has_many :seats
  after_create :create_seats

  def create_seats
    self.total_seats.times do |i|
      self.seats.create!(
        seat_number: i
      )
    end
  end
end

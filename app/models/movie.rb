class Movie < ApplicationRecord
  belongs_to :genre
  has_many :shows
end

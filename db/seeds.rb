# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

movie1 = Movie.find_or_create_by!(
  title: "Harry potter: Part 1",
  director_name: "J.K Rolling",
  release_date: 6.year.ago,
  rating: 4,
  genre: Genre.find_or_create_by!(name: "Drama")
)
movie2 = Movie.find_or_create_by!(
  title: "Star Wars",
  director_name: 'George Lucas',
  release_date: 1.year.ago,
  rating: 4,
  genre: Genre.find_or_create_by!(name: "Drama")
)
movie3 = Movie.find_or_create_by!(
  title: "Due Date",
  genre: Genre.find_or_create_by!(name: "Comedy"),
  director_name: "Todd Phillips",
  rating: 3
)
Movie.find_or_create_by!(title: "War", genre: Genre.find_or_create_by!(name: "Action"))

Show.find_or_create_by!(movie: movie1, datetime: DateTime.now + 1.day)
Show.find_or_create_by!(movie: movie1, datetime: DateTime.now + 2.day)
Show.find_or_create_by!(movie: movie1, datetime: DateTime.now + 3.day)

Show.find_or_create_by!(movie: movie2, datetime: DateTime.now + 1.day + 3.hours)
Show.find_or_create_by!(movie: movie2, datetime: DateTime.now + 2.day + 3.hours)

Show.find_or_create_by!(movie: movie3, datetime: DateTime.now + 1.day + 6.hours)

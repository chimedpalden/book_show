class User < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  has_many :bookings
end

class AddSeatCount < ActiveRecord::Migration[7.1]
  def change
    add_column :shows, :total_seats, :integer, default: 100
    add_column :seats, :booked, :boolean, default: false
  end
end

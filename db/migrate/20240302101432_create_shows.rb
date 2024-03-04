class CreateShows < ActiveRecord::Migration[7.1]
  def change
    create_table :shows do |t|
      t.references :movie, null: false, foreign_key: true
      t.datetime :datetime

      t.timestamps
    end
  end
end

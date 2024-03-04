class CreateMovies < ActiveRecord::Migration[7.1]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :director_name
      t.date :release_date
      t.integer :rating
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end

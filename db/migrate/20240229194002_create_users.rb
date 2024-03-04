class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username, null: false, index: { unique: true }
      t.string :email
      t.string :password_digest, null: false
      t.string :authentication_token

      t.timestamps
    end
  end
end

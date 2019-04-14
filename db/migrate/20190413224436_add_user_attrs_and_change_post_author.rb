class AddUserAttrsAndChangePostAuthor < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :author
    add_column :posts, :user_id, :integer, index: true
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end

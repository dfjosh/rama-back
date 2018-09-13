class AddColumnPostImageToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :feature_image, :string
    add_column :posts, :feature_link, :string
  end
end

class AddSlugToPodcasts < ActiveRecord::Migration[5.2]
  def change
    add_column :podcasts, :slug, :string, index: true, unique: true
    add_column :podcasts, :state, :string
    add_column :podcasts, :header_image, :string
  end
end

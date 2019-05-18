class AddEpisodeNumberToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :episode_number, :integer
    add_column :posts, :episode_type, :string
  end
end

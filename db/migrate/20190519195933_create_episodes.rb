class CreateEpisodes < ActiveRecord::Migration[5.2]
  def change
    create_table :episodes do |t|
      t.string :title
      # t.string :subtitle # I dont't see where this is displayed in iTunes on mac/iphone except in Get Info. Explorers' feed does use it tho
      t.string :guid
      t.string :summary # description
      t.integer :number # episode (episode number)
      t.string :episode_type
      t.datetime :pub_date
      t.integer :duration
      t.boolean :explicit
      t.string :image
      t.string :state
      t.integer :podcast_id
      t.integer :post_id # link
      t.integer :user_id
      t.timestamps
    end
    
    remove_column :posts, :type, :string
    remove_column :posts, :podcast_id, :integer
    remove_column :posts, :duration, :integer
    remove_column :posts, :explicit, :boolean
    remove_column :posts, :episode_number, :integer
    remove_column :posts, :episode_type, :string
    
    rename_column :podcasts, :listing_type, :podcast_type
  end
end

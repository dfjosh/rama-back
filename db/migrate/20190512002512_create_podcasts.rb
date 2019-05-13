class CreatePodcasts < ActiveRecord::Migration[5.2]
  def change
    create_table :podcasts do |t|
      t.string :title
      t.string :description
      t.string :website
      t.string :listing_type
      t.integer :user_id
      t.string :feed
      t.string :image
      t.string :category
      t.string :subcategory
      t.boolean :explicit, default: false
      t.timestamps
    end
  end
end

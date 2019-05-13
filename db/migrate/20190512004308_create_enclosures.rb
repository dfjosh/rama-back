class CreateEnclosures < ActiveRecord::Migration[5.2]
  def change
    create_table :enclosures do |t|
      t.string :url
      t.integer :size
      t.string :mime_type
      t.integer :episode_id
      t.timestamps
    end
  end
end

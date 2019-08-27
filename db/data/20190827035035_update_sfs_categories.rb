class UpdateSfsCategories < ActiveRecord::Migration[5.2]
  def up
    sfs = Podcast.find_by_slug("science-fiction-shorts")
    sfs.category = "Fiction"
    sfs.subcategory = "Science Fiction"
    sfs.save!
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
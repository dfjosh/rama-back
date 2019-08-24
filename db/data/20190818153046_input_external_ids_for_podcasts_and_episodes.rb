class InputExternalIdsForPodcastsAndEpisodes < ActiveRecord::Migration[5.2]
  def up
    sfs = Podcast.find_by_slug("science-fiction-shorts")
    sfs.external_id = 1466031504
    sfs.save!
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
class AddExternalIdForPodcastAndEpisode < ActiveRecord::Migration[5.2]
  def change
    add_column :podcasts, :external_id, :bigint
  end
end

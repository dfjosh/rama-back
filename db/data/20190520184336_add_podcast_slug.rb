class AddPodcastSlug < ActiveRecord::Migration[5.2]
  def up
    episode = Episode.first
    podcast = episode.podcast
    podcast.slug = "science-fiction-shorts"
    podcast.state = Post::States::PUBLISHED
    podcast.header_image = "science-fiction-shorts/science-fiction-shorts-header.png"
    podcast.save!
    # episode.slug = "#{podcast.slug}/the-brick-moon-pt-1"
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end
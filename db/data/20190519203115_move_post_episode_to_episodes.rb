class MovePostEpisodeToEpisodes < ActiveRecord::Migration[5.2]
  def up
    self.transaction do
      podcast = Podcast.find_by_title("Science Fiction Shorts")
      ref_post = Post.find_by_title("The Brick Moon, pt 1")
      enclosure = Enclosure.find_by_url("science-fiction-shorts/episodes/the-brick-moon-1.mp3")
      
      Episode.create!(
        title: ref_post.title,
        guid: SecureRandom.uuid,
        summary: ref_post.body.gsub("'", "\""),
        number: 1,
        episode_type: Episode::EpisodeTypes::FULL,
        pub_date: ref_post.created_at,
        duration: 3309,
        explicit: false,
        image: nil,
        state: ref_post.state,
        podcast: podcast,
        post: ref_post,
        user: ref_post.user,
        enclosure: enclosure # must add this here not after else, callback/validation fails
      )
      
      ref_post.destroy!
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end
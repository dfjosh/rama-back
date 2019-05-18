class CreateFirstPodcastAndEpisode < ActiveRecord::Migration[5.2]
  def up
    self.transaction do
      user = User.find_by_last_name("Wetenkamp")
      user.pen_name = "J. Arthur Wetenkamp"
      user.save!
      
      podcast = Podcast.create!(
        title: "Science Fiction Shorts",
        description: "I read sci-fi stories to you while you drive to work, walk the dog, or try and fall asleep. Then maybe I give you my thoughts on the story, followed by you tweeting me your own commentary. We all become best friends and fly away in hover cars into a binary sunset.",
        website: "https://www.distantfuturejosh.com",
        listing_type: "episodic",
        user: user,
        feed: "science-fiction-shorts.xml",
        image: "science-fiction-shorts/science-fiction-shorts-artwork.png",
        category: "Arts",
        subcategory: "Literature",
        explicit: false
      )
      
      episode = Posts::Episode.create!(
        episode_number: 1,
        episode_type: "full",
        title: "The Brick Moon, pt 1",
        slug: "the-brick-moon-pt-1",
        body: "We begin with a story concerning the age old problem of the longitude. The solution proposed could prove to be 'the blessing of all seamen...the second cynosure of all lovers upon the waves'.",
        state: Post::PUBLISHED,
        user: user,
        podcast: podcast,
        duration: 3309,
        explicit: false,
        enclosure: Enclosure.create!(
          url: "science-fiction-shorts/episodes/the-brick-moon-1.mp3",
          size: 33090496,
          mime_type: "audio/mpeg"
        )
      )
    end
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end
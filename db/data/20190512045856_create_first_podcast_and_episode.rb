class CreateFirstPodcastAndEpisode < ActiveRecord::Migration[5.2]
  def up
    user = User.find_by_last_name("Wetenkamp")
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
    podcast.episodes << Posts::Episode.create!(
      title: "The Brick Moon, pt 1",
      slug: "the-brick-moon-pt-1",
      body: "We begin with a story concerning the age old problem of the longitude. The solution proposed could prove to be 'the blessing of all seamen...the second cynosure of all lovers upon the waves'.",
      state: Post::DRAFT,
      user: user,
      duration: 3309,
      explicit: false,
      enclosure: Enclosure.create!(
        url: "science-fiction-shorts/episodes/the-brick-moon-1.m4a",
        size: 53646420,
        mime_type: "audio/x-m4a"
      )
    )
  end

  def down
    # raise ActiveRecord::IrreversibleMigration
  end
end
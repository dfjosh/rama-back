class Posts::Episode < Post
  belongs_to :podcast
  has_one :enclosure
  
  after_save :update_podcast_rss_feed!
  
  def update_podcast_rss_feed!
    podcast.create_and_upload_rss_feed!
  end
end

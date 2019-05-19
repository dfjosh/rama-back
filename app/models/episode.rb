class Episode < ApplicationRecord
  belongs_to :podcast
  belongs_to :post
  belongs_to :author, class_name: User.to_s, foreign_key: :user_id
  belongs_to :user
  has_one :enclosure
  
  validates :enclosure, presence: true
  
  after_save :update_podcast_rss_feed!
  
  module EpisodeTypes
    FULL = "full"
    TRAILER = "trailer"
    BONUS = "bonus"
  end
  
  
  def update_podcast_rss_feed!
    podcast.create_rss_feed!(upload: Rails.env.production?)
  end
end

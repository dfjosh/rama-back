class Api::EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :guid, :summary, :number, :episode_type, :duration, :explicit, :image, :podcast_id, :post_id, 
    :user_id, :created_at, :updated_at
    
  has_one :post, serializer: Api::PostAndUserOnlySerializer
  has_one :podcast, serializer: Api::PodcastOnlySerializer
  has_one :enclosure
end

class Api::EpisodeSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :id, :title, :guid, :summary, :number, :episode_type, :duration, :explicit, :image, :podcast_id, :post_id, 
    :user_id, :created_at, :updated_at
    
    has_one :post
    has_one :enclosure
end

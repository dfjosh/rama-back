class Api::PodcastSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
    :created_at, :updated_at, :slug, :state, :header_image
    
  has_many :episodes
end

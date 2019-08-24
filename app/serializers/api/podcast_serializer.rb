class Api::PodcastSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
    :created_at, :updated_at, :slug, :state, :header_image, :external_id
    
  has_many :episodes
end

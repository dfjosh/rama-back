class Api::PodcastOnlySerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
    :created_at, :updated_at, :slug, :state, :header_image, :external_id
end

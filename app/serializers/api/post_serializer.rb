class Api::PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :body, :state, :created_at, :updated_at, :feature_image, :feature_link, :published_at
  
  has_one :user
  has_many :post_categories
  has_many :post_tags
  has_many :comments
  has_one :episode, serializer: Api::EpisodeOnlySerializer
end

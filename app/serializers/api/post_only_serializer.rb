class Api::PostOnlySerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :body, :state, :created_at, :updated_at, :feature_image, :feature_link, :published_at
end

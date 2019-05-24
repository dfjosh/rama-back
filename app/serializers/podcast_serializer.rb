class PodcastSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :website, :podcast_type, :feed, :image, :category, :subcategory, :explicit, 
    :created_at, :updated_at, :slug, :state, :header_image
    
  has_many :episodes
end

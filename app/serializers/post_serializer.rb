class PostSerializer
  include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :title, :slug, :body, :state, :created_at, :updated_at, :feature_image, :feature_link
  
  belongs_to :user
  has_many :post_categories#, lazy_load_data: true
  has_many :post_tags#, lazy_load_data: true
  has_many :comments#, lazy_load_data: true
  # has_many :post_tags, links: {
  #   related: -> (object) {
  #     "http://localhost:3000/posts/#{object.id}/post_tags"
  #   }
  # }
  # has_many :tags, lazy_load_data: true, links: {
  #   related: -> (object) {
  #     "http://localhost:3000/posts/#{object.id}/tags"
  #   }
  # }

  # old jsonapi_resource stuff
  # def self.default_sort
  #   [{ field: 'created_at', direction: :desc }]
  # end
  # 
  # filters :author, :categories, :title
  # 
  # filter "!categories", apply: ->(records, value, _options) {
  #   records.joins(:categories).where("categories.id NOT IN (?)", value[0])
  # }
  # 
  # paginator :paged


end

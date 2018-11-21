class PostSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :title, :author, :body, :created_at, :updated_at, :feature_image, :feature_link
  has_many :categories
  has_many :tags#, always_include_linkage_data: true
  has_many :comments

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

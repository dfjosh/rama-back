class PostResource < JSONAPI::Resource
  attributes :title, :author, :body, :feature_image, :feature_link, :created_at, :updated_at
  has_many :categories
  has_many :tags#, always_include_linkage_data: true
  has_many :comments

  def self.default_sort
    [{ field: 'created_at', direction: :desc }]
  end

  filters :author, :categories, :title
  
  filter "!categories", apply: ->(records, value, _options) {
    records.joins(:categories).where("categories.id NOT IN (?)", value[0])
  }

  paginator :paged


end

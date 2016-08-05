class PostResource < JSONAPI::Resource
  attributes :title, :author, :body, :created_at, :updated_at
  has_many :categories
  has_many :tags, always_include_linkage_data: true
end

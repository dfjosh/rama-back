class TagResource < JSONAPI::Resource
  attributes :name
  has_many :posts
end

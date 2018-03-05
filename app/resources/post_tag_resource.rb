class PostTagResource < JSONAPI::Resource
  belongs_to :post
  belongs_to :tag
end

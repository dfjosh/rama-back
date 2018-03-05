class PostCategoryResource < JSONAPI::Resource
  belongs_to :post
  belongs_to :category
end

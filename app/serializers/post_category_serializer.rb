class PostCategorySerializer
  include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  belongs_to :post
  belongs_to :category
end

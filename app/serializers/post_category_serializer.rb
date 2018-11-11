class PostCategorySerializer
  include FastJsonapi::ObjectSerializer
  
  belongs_to :post
  belongs_to :category
end

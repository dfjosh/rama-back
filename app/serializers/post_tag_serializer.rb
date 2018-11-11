class PostTagSerializer
  include FastJsonapi::ObjectSerializer
  
  belongs_to :post
  belongs_to :tag
end

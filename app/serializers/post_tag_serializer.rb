class PostTagSerializer
  include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  belongs_to :post
  belongs_to :tag
end

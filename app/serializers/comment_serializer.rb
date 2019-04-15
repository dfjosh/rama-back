class CommentSerializer
  include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :author, :email, :content, :approved, :parent, :created_at, :updated_at
  # belongs_to :post
  
  # paginator :none
end

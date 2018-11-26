class CommentSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :author, :email, :content, :approved, :parent, :created_at, :updated_at
  # belongs_to :post
  
  # paginator :none
end

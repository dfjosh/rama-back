class CommentResource < JSONAPI::Resource
  attributes :author, :email, :content, :approved, :parent, :created_at, :updated_at
  belongs_to :post
end

class Api::CommentSerializer < ActiveModel::Serializer
  attributes :id, :author, :email, :content, :approved, :parent, :created_at, :updated_at
end

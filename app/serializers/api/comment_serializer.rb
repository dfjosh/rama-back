class Api::CommentSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :id, :author, :email, :content, :approved, :parent, :created_at, :updated_at
  # belongs_to :post
  
  # paginator :none
end

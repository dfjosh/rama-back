class Api::PostTagSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :id
  
  # has_one :post
  has_one :tag
end

class Api::PostTagSerializer < ActiveModel::Serializer
  attributes :id
  
  has_one :tag
end

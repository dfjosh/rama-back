class Api::PostCategorySerializer < ActiveModel::Serializer
  attributes :id
  
  has_one :category
end

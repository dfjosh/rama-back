class Api::TagSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :id, :name, :created_at, :updated_at
  # has_many :posts

  # old jsonapi_resource stuff
  # def self.default_sort
  #   [{ field: 'name', direction: :asc }]
  # end
  # paginator :paged # it will work without this, but you will see errors
end

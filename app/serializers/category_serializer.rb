class CategorySerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :name
  # has_many :posts

  # old jsonapi_resource stuff
  # def self.default_sort
  #   [{ field: 'name', direction: :asc }]
  # end
  # 
  # filters :name
  # paginator :paged # it will work without this, but you will see errors
end

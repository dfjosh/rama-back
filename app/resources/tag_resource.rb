class TagResource < JSONAPI::Resource
  attributes :name
  has_many :posts

  def self.default_sort
    [{ field: 'name', direction: :asc }]
  end
  paginator :paged # it will work without this, but you will see errors
end

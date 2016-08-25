class TagResource < JSONAPI::Resource
  attributes :name
  has_many :posts

  def self.default_sort
    [{ field: 'name', direction: :asc }]
  end
end

class PostResource < JSONAPI::Resource
  attributes :title, :author, :body, :created_at, :updated_at
end

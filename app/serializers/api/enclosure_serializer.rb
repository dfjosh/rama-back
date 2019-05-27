class Api::EnclosureSerializer < ActiveModel::Serializer
  attributes :id, :url, :size, :mime_type, :created_at, :updated_at
end

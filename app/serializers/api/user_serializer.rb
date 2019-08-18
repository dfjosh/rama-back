class Api::UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :is_admin, :pen_name#, :email
end

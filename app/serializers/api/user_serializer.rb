class Api::UserSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :id, :first_name, :last_name, :is_admin, :pen_name#, :email
end

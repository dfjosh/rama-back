class UserSerializer
  include FastJsonapi::ObjectSerializer
  # set_key_transform :dash

  attributes :first_name, :last_name, :email, :is_admin
end

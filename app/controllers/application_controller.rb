class ApplicationController < JSONAPI::ResourceController
  # include JSONAPI::ActsAsResourceController
  protect_from_forgery with: :null_session
end

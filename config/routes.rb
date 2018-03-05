Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  jsonapi_resources :categories
  jsonapi_resources :comments
  jsonapi_resources :posts
  jsonapi_resources :post_categories
  jsonapi_resources :post_tags
  jsonapi_resources :tags
end

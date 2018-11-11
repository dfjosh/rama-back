Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :comments
  resources :posts
  resources :post_categories
  resources :post_tags
  resources :tags
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :categories
  resources :comments
  resources :posts do
    resources :post_tags
  end
  resources :post_categories
  resources :post_tags
  resources :sessions
  resources :tags
  resources :users
  post 'user_token' => 'user_token#create'
end

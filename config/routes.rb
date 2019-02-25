Rails.application.routes.draw do
  namespace :api do
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
    post "user_token" => "user_token#create"
  end
  
  root to: "index"
  # get "*path", to: "application#show"
end

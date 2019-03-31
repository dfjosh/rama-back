Rails.application.routes.draw do
  mount_ember_app :frontend, to: "/"
  
  namespace :api do
    resources :categories
    resources :comments
    resources :posts, param: :slug do
      resources :post_tags
    end
    resources :post_categories
    resources :post_tags
    resources :sessions
    resources :tags
    resources :users
    post "user_token" => "user_token#create"
  end
end

Rails.application.routes.draw do
  namespace :api do
    resources :categories
    resources :comments
    
    get 'podcasts/:slug' => 'podcasts#show'
    resources :podcasts
    resources :episodes
    resources :enclosures
    
    get 'goodreads_reviews' => 'goodreads_reviews#index'

    get 'posts/:slug' => 'posts#show'
    # resources :posts, param: :slug do
    resources :posts do
      resources :post_tags # don't think I'm using this ever, but I probably should be (and post_cats)
    end
    
    resources :post_categories
    resources :post_tags
    resources :sessions
    resources :tags
    resources :users
    post 'user_token' => 'user_token#create'
  end
  
  get '*path', to: 'root#index'
  root 'root#index'
end
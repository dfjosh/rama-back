class Api::EpisodesController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    episodes = Episode.all
    scopes = []
    
    if !current_user&.is_admin?
      scopes << { scope: :where_state, args: [Post::States::PUBLISHED] }
    end
    
    if filters = params[:filters]
      filters.each do |filter|
        filter = filter.second
        scopes << {
          scope: "where_#{filter[:scope]}".to_sym, 
          args: filter[:args]
        }
      end
    end
    
    episodes = scopes.inject(Episode.all) do |model, scope|
      puts "scoping #{model.name} --> #{scope.inspect}"
      model.send(scope[:scope], *scope[:args])
    end
    
    episodes = episodes.order(created_at: :desc)
    
    render json: EpisodeSerializer.new(episodes).serialized_json
  end
  
  def show
    episode = Episode.find(params[:id])
    render json: EpisodeSerializer.new(episode).serialized_json
  end
  
  def create
    episode = Episode.create!(episode_params)
    if episode
      render json: EpisodeSerializer.new(episode).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    episode = Episode.find(params[:id])
    if episode.update_attributes!(episode_params)
      render json: EpisodeSerializer.new(episode).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    episode = Episode.find(params[:id])
    episode.destroy!
  end
  
  private
  
  def episode_params
    permitted = [:title, :guid, :summary, :number, :episode_type, :pub_date, :duration, :explicit, :image, :state,
      :podcast_id, :post_id, :user_id, :created_at, :updated_at]
    restify_param(:episode).require(:episode).permit(permitted)
  end
end

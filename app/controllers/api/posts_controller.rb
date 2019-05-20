class Api::PostsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  
  def index
    posts = Post.all # I would think it would be bad to do a Post.all and then later do more #where calls, but it doesn't actually appear to make a separate db query here...don't know why
    clauses = []
    
    if !current_user&.is_admin?
      clauses << {
        join: nil,
        where: "state = ?",
        arg: Post::States::PUBLISHED
      }
    end
    
    if filters = params[:filters]
      filters.each do |filter|
        filter = filter.second
        clauses << {
          join: filter[:name].split(".")[0..-2].first&.to_sym, 
          where: "#{filter[:name]} #{filter[:op]} ?", 
          arg: filter[:val]
        }
      end
    end
    
    clauses.each do |clause|
      posts = posts.joins(clause[:join]).where(clause[:where], clause[:arg])
    end
    # posts = clauses.inject(Post.all) do |scope, clause|
    #   scope.joins(clause[0]).where(clause[1], clause[2])
    # end
    
    limit = params[:limit]&.to_i
    offset = limit ? (params[:page]&.to_i - 1) * limit : nil
    
    posts = posts.group("posts.id").order("posts.created_at DESC")
    total = posts.length # NOTE must happen AFTER grouping! TODO or should I be sending the number of pages?
    posts = posts.includes(params[:includes]).limit(limit).offset(offset) # NOTE only gets includes for the paginated subset. Much more efficient!

    options = {
      include: params[:includes], 
      meta: {total: total}
    }
    render json: PostSerializer.new(posts, options).serialized_json
  end
  
  def show
    post = Post.find_by_slug(params[:slug])
    render json: PostSerializer.new(post).serialized_json
  end
  
  def create
    # post = Post.create!(post_params)
    post = Post.new(post_params)
    post.user_id = params[:data][:relationships][:user][:data][:id] # HACK
    if post.save!
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    post = Post.find(params[:id])
    # post = Post.find_by_slug(params[:slug])
    if post.update_attributes!(post_params)
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    # post = Post.find_by_slug(params[:slug])
    post.destroy!
  end
  
  private
  
  def post_params
    permitted = [:title, :slug, :body, :state, :created_at, :updated_at, :feature_image, :feature_link]
    params.require(:data).require(:attributes).permit(*permitted)
  end
end

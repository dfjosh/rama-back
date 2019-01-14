class PostsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  
  def index
    posts = Post.all
    
    if filter = params[:filter]
      posts = posts.joins(filter[:name].split(".")[0..-2].map(&:to_sym))
                   .where("#{filter[:name]} #{filter[:op]} ?", filter[:val])
    end
    
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
    post = Post.find(params[:id])
    render json: PostSerializer.new(post).serialized_json
  end
  
  def create
    post = Post.create!(post_params)
    if post
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    post = Post.find(params[:id])
    if post.update_attributes!(post_params)
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    post.destroy!
  end
  
  private
  
  def post_params
    params.require(:data).require(:attributes).permit(:title, :author, :body, :created_at, :updated_at, :feature_image, :feature_link)
  end
end

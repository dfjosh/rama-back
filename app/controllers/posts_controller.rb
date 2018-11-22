class PostsController < ApplicationController
  def index
    if params[:categories]
      posts = Post.joins(:categories)
                  .where(categories: {name: params[:categories]})
                  .group("posts.id")
                  .order("posts.created_at DESC")
    elsif params["!categories"]
      posts = Post.joins(:categories)
                  .where.not(categories: {name: params["!categories"]})
                  .group("posts.id")
                  .order("posts.created_at DESC")
    else
      posts = Post.all
    end
    
    render json: PostSerializer.new(posts).serialized_json
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

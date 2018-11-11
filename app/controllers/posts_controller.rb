class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: PostSerializer.new(posts).serialized_json
  end
  
  def show
    post = Post.find(params[:id])
    render json: PostSerializer.new(post).serialized_json
  end
  
  def create
    post = Post.create!(object_params)
    if post
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 500}
    end
  end
  
  def update
    post = Post.find(params[:id])
    if post.update_attributes!(object_params)
      render json: PostSerializer.new(post).serialized_json
    else
      render json: {error: 500}
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    post.destroy!
  end
  
  private
  
  def object_params
    params.require(:post).permit(:title, :author, :body, :feature_image, :feature_link)
  end
end

class Api::PostTagsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    post_tags = PostTag.all
    
    if post_id = params[:post_id]
      post_tags = post_tags.where(post_id: post_id)
    end
    
    render json: post_tags
  end
  
  def show
    post_tag = PostTag.find(params[:id])
    render json: post_tag
  end
  
  def create
    post_tag = PostTag.create!(post_tag_params)
    if post_tag
      render json: post_tag
    else
      render json: {error: 400}
    end
  end
  
  def update
    post_tag = PostTag.find(params[:id])
    if post_tag.update_attributes!(post_tag_params)
      render json: post_tag
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    post_tag = PostTag.find(params[:id])
    post_tag.destroy!
  end
  
  private
  
  def post_tag_params
    params.require(:post_tag).permit(:post_id, :tag_id)
  end
end

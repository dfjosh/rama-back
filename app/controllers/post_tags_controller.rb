class PostTagsController < ApplicationController
  def index
    post_tags = PostTag.all
    
    if post_id = params[:post_id]
      post_tags = post_tags.where(post_id: post_id)
    end
    
    render json: PostTagSerializer.new(post_tags).serialized_json
  end
  
  def show
    post_tag = PostTag.find(params[:id])
    render json: PostTagSerializer.new(post_tag).serialized_json
  end
  
  def create
    post_tag = PostTag.create!(post_tag_params)
    if post_tag
      render json: PostTagSerializer.new(post_tag).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    post_tag = PostTag.find(params[:id])
    if post_tag.update_attributes!(post_tag_params)
      render json: PostTagSerializer.new(post_tag).serialized_json
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
    restify_param(:post_tag).require(:post_tag).permit(:post_id, :tag_id)
  end
end

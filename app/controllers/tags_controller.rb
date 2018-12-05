class TagsController < ApplicationController
  def index
    tags = Tag.all.order(id: :desc)
    render json: TagSerializer.new(tags).serialized_json
  end
  
  def show
    tag = Tag.find(params[:id])
    render json: TagSerializer.new(tag).serialized_json
  end
  
  def create
    tag = Tag.create!(tag_params)
    if tag
      render json: TagSerializer.new(tag).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    tag = Tag.find(params[:id])
    if tag.update_attributes!(tag_params)
      render json: TagSerializer.new(tag).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    tag = Tag.find(params[:id])
    tag.destroy!
  end
  
  private
  
  def tag_params
    params.require(:data).require(:attributes).permit(:name, :created_at, :updated_at)
  end
end

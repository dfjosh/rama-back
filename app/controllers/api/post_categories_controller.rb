class Api::PostCategoriesController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    post_categories = PostCategory.all
    render json: post_categories
  end
  
  def show
    post_category = PostCategory.find(params[:id])
    render json: post_category
  end
  
  def create
    post_category = PostCategory.create!(post_category_params)
    if post_category
      render json: post_category
    else
      render json: {error: 400}
    end
  end
  
  def update
    post_category = PostCategory.find(params[:id])
    if post_category.update_attributes!(post_category_params)
      render json: post_category
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    post_category = PostCategory.find(params[:id])
    post_category.destroy!
  end
  
  private
  
  def post_category_params
    params.require(:post_category).permit(:post_id, :category_id)
  end
end

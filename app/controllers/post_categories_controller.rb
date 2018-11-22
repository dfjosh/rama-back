class PostCategoriesController < ApplicationController
  def index
    post_categories = PostCategory.all
    render json: PostCategorySerializer.new(post_categories).serialized_json
  end
  
  def show
    post_category = PostCategory.find(params[:id])
    render json: PostCategorySerializer.new(post_category).serialized_json
  end
  
  def create
    post_category = PostCategory.create!(post_category_params)
    if post_category
      render json: PostCategorySerializer.new(post_category).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    post_category = PostCategory.find(params[:id])
    if post_category.update_attributes!(post_category_params)
      render json: PostCategorySerializer.new(post_category).serialized_json
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
    restify_param(:post_category).require(:post_category).permit(:post_id, :category_id)
  end
end

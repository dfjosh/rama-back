class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: CategorySerializer.new(categories).serialized_json
  end
  
  def show
    category = Category.find(params[:id])
    render json: CategorySerializer.new(category).serialized_json
  end
  
  def create
    category = Category.create!(category_params)
    if category
      render json: CategorySerializer.new(category).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def update
    category = Category.find(params[:id])
    if category.update_attributes!(category_params)
      render json: CategorySerializer.new(category).serialized_json
    else
      render json: {error: 400}
    end
  end
  
  def destroy
    category = Category.find(params[:id])
    category.destroy!
  end
  
  private
  
  def category_params
    params.require(:data).require(:attributes).permit(:name, :created_at, :updated_at)
  end
end

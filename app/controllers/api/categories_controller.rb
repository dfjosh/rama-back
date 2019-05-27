class Api::CategoriesController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def index
    categories = Category.all.order(id: :desc)
    render json: categories
  end
  
  def show
    category = Category.find(params[:id])
    render json: category
  end
  
  def create
    category = Category.create!(category_params)
    if category
      render json: category
    else
      render json: {error: 400}
    end
  end
  
  def update
    category = Category.find(params[:id])
    if category.update_attributes!(category_params)
      render json: category
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
    params.require(:category).permit(:name, :created_at, :updated_at)
  end
end

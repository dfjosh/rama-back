class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: CategorySerializer.new(categories).serialized_json
  end
end

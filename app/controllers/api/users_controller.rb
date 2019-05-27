class Api::UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user, serializer: Api::UserSerializer
  end
end

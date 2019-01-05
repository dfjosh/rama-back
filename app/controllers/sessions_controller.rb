class SessionsController < ApplicationController
  def create
    user = User.find_by_email(session_params[:email])
    if user&.authenticate(session_params[:password])
      puts "Authenticated!"
      session[:user_id] = user.id
      render json: UserSerializer.new(user).serialized_json
    else
      render json: {error: "invalid email or password."}
    end
  end
  
  def destroy
    session[:user_id] = nil
    render json: {message: "logged out."}
  end
  
  private
  
  def session_params
    params.require(:data).require(:attributes).permit(:email, :password)
  end
end

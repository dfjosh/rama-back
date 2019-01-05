class SessionsController < ApplicationController
  def create
    user = User.find_by_email(params[:username])
    if user&.authenticate(params[:password])
      puts "Authenticated!"
      session[:user_id] = user.id
      render json: {access_token: SecureRandom.hex(32)}
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

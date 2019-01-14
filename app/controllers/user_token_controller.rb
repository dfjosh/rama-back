class UserTokenController < Knock::AuthTokenController
  def create
    user = User.find_by_email(user_token_params[:email])
    
    if user&.authenticate(user_token_params[:password])
      # token = JWT.encode(user_token_params, ENV["SECRET_KEY_BASE"], "HS256")
      token = Knock::AuthToken.new(payload: { sub: user.id }).token
      render json: {token: token} #, status: :created
    else
      render json: {error: "invalid email or password."}
    end
  end
  
  private
  
  def user_token_params
    params.require(:auth).permit(:email, :password)
  end
end

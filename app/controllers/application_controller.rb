class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session # why can't this be uncommented?! actually I think is is left over from pre-rails 5? i.e. I think this is included in ActionController::Base now and it is actually being used and works???? https://codebrains.io/rails-jwt-authentication-with-knock/
  include Knock::Authenticable
  
  # filter_operators = {
  #   eq: "="
  # }
  
  private
  
  # def filter_params
  #   filter = params[:filter]
  #   hsh = {
  #     joins: [],
  #     attr: "",
  # 
  #   }
  # end
  
  # def current_user
  #   @current_user ||= User.find(session[:user_id]) if session[:user_id]
  # end
end

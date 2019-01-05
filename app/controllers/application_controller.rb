class ApplicationController < ActionController::API
  # protect_from_forgery with: :null_session # why can't this be uncommented?!
  
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
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end

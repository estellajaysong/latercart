class ApplicationController < ActionController::API
  include ActionController::Helpers

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  puts "=============== #{@current_user}"

end

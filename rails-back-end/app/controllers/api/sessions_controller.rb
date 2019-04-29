class Api::SessionsController < ApplicationController
  after_action :current_user
  def new
  end

  def create
    # If the user exists AND the password entered is correct.
    # puts params
    @user = User.find_by_email(params[:userInfo][:email])
    if @user.password == params[:userInfo][:password]
      session[:user_id] = @user.id
      render json: @user 
    else
      redirect_to '/login'
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  puts "=============== #{@current_user}"

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end
end
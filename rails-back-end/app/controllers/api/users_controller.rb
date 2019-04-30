class Api::UsersController < ApplicationController
  before_action :authenticate_user
  
  def new

  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      redirect_to '/'
    else
      puts 'unable to create user'
    end
  end

  private
  def user_params
    params.fetch(:user, {}).permit(:name, :email, :password, :password_confirmation)
  end
end
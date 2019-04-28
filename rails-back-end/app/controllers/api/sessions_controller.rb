class Api::SessionsController < ApplicationController
  def new
  end

  def create
    # If the user exists AND the password entered is correct.
    puts params
    @user = User.find_by_email(params[:userInfo][:email])
    if @user.password == params[:userInfo][:password]
      session[:user_id] = @user.id
      puts session[:user_id]
      redirect_to '/'
    else
      redirect_to '/login'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end
end
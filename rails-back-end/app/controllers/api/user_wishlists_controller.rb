class Api::UserWishlistsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:info][:email])
    puts "share: user.id>>>>>>>>>>>>#{@user.id}"
    @user.user_wishlists.create({
      wishlist_id: params[:info][:wishlist_id]
    }) 
    # render json: @newUserWishlist
  end

end
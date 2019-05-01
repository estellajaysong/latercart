class Api::UserWishlistsController < ApplicationController
  def index
    @emails = UserWishlist.where(wishlist_id: params[:wishlistId]).where.not(user_id: current_user.id).map{|r|{user: User.select(:email).find_by(id: r.user_id)}}
    puts "emails >>>>>>>>>>>>> #{@emails}"
    render json: @emails
  end

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
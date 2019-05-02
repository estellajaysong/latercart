class Api::UserWishlistsController < ApplicationController
  def index
    @emails = UserWishlist.where(wishlist_id: params[:wishlistId]).where.not(user_id: current_user.id).map{|r|{user: User.select(:email).find_by(id: r.user_id)}}
    puts "emails >>>>>>>>>>>>> #{@emails}"
    render json: @emails
  end

  def new
  end

  def create
    @mailUser = User.find_by(email: params[:info][:email])
    @mailUser.user_wishlists.create({
      wishlist_id: params[:info][:wishlist_id]
    }) 
    UserMailer.share_wishlist_email(@mailUser, current_user).deliver_now
    # render json: @newUserWishlist
  end

end
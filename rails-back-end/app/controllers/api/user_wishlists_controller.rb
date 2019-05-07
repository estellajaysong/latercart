class Api::UserWishlistsController < ApplicationController
  def index
    @emails = UserWishlist.where(wishlist_id: params[:wishlistId]).where.not(user_id: current_user.id).map{|r|{user: User.select(:id, :username, :email).find_by(id: r.user_id)}}
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
    @sharedWishlist = Product.where(wishlist_id: params[:info][:wishlist_id])
    @wishlistName = Wishlist.find_by(id: params[:info][:wishlist_id])
    @wishlistURL = "http://localhost:3000/wishlists/#{params[:info][:wishlist_id]}"
    puts ">>>>>>>>>>>>> #{@wishlistURL}"
    
    UserMailer.share_wishlist_email(@mailUser, current_user, @sharedWishlist, @wishlistName.name, @wishlistURL).deliver_now
    # render json: @newUserWishlist
  end

end
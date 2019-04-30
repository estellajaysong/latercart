class Api::WishlistsController < ApplicationController
  before_action :authenticate_user
  def index
    if current_user
      puts "user id>>>>>>>>>>>>>>>#{current_user.id}"
      @wishlists = Wishlist.joins(:user_wishlists).where('"user_wishlists"."user_id" IN (?)', current_user.id).order("created_at DESC")
      render json: @wishlists
    else
      puts "Unable to pull the wishlist before user login"
    end
    
  end

  def create
    @newWishlist = Wishlist.create(wishlist_params)

    if @newWishlist.save
      @user = current_user
      @user.user_wishlists.create({user: @user, wishlist: @newWishlist})
    else
      puts "Unable to insert into user_wishlists"
    end

    render json: @newWishlist
  end

  def update
    @wishlist = Wishlist.find(params[:id])
    @wishlist.update_attributes(wishlist_params)
    render json: @wishlist
  end

  def destroy
    @delWishlist = Wishlist.find(params[:id])
    if @delWishlist.destroy
      head :ok
    else
      render json: @delWishlist.errors, status: :unprocessable_entity
    end
  end

  private
  
    def wishlist_params
      params.require(:wishlist).permit(:name)
    end

    

end

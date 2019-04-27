class Api::WishlistsController < ApplicationController
  def index
    @wishlists = Wishlist.all.order("created_at DESC")
    render json: @wishlists
    
  end

  def create
    @newWishlist = Wishlist.create(wishlist_params)
    render json: @newWishlist
  end
  
  private
  
    def wishlist_params
      params.require(:wishlist).permit(:name)
    end

end

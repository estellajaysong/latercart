class Api::WishlistController < ApplicationController
  def index
    @wishlists = Wishlist.all.order(created_at: :desc)
    render :json => {
      message: "hello!"
    }
  end
end

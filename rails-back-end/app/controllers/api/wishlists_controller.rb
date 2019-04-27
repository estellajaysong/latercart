class Api::WishlistsController < ApplicationController
  def index
    @wishlists = Wishlist.all
    render :json => {
      wishlists: @wishlists
    }
  end
end

class Api::TestsController < ApplicationController
  def new
  end

  def create
    @newWishlist.user_wishlists.create(user_id: current_user.id)
  end
end
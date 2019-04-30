class Api::WishlistsController < ApplicationController
  before_action :authenticate_user
  def index
    if current_user
      puts "user id>>>>>>>>>>>>>>>#{current_user.id}"
      @wishlists = Wishlist.joins(:user_wishlists).where('"user_wishlists"."user_id" IN (?)', current_user.id)
      render json: @wishlists
    else
      redirect_to 'api/login'
    end
    
  end

  def create
    @newWishlist = Wishlist.create(wishlist_params)

    if @newWishlist.save
      @user = current_user
      @user.user_wishlists.create({user_id: @user.id, wishlist: @newWishlist})
    else
      redirect_to 'api/login'
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
      head :no_content, status: :ok
    else
      render json: @delWishlist.errors, status: :unprocessable_entity
    end
  end

  # def get_user(jwt)
  #   decoded_token = JWT.decode jwt, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
  #   current_user = User.find((decoded_token[0])['sub']))
  #   return current_user
  # end

  def set_current_user
    if decoded_auth_token
      @current_user = User.find(decoded_auth_token['sub'])
    end
  end

  def decoded_auth_token
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      puts "token>>>>>>>>>>>#{token}"
      JsonWebToken.decode(token)
    end
  end
  private
  
    def wishlist_params
      params.require(:wishlist).permit(:name)
    end

    

end

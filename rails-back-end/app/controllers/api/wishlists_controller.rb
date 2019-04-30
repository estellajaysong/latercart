class Api::WishlistsController < ApplicationController
  before_action :authenticate_user, except: :show
  def index
    if current_user
      puts "user id>>>>>>>>>>>>>>>#{current_user.id}"
      @wishlists = Wishlist.joins(:user_wishlists).where('"user_wishlists"."user_id" IN (?)', current_user.id)
      # @wishlists = Wishlist.all.order("created_at DESC")
      render json: @wishlists
    else
      puts "redirect"
      redirect_to 'api/login'
    end
    
  end

  def show
    # @wishlist = Wishlist.find_by params[:id]
    @products = Product.where(wishlist_id: params[:id])
    render json: @products
  end

  def create
    @newWishlist = Wishlist.create(wishlist_params)
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

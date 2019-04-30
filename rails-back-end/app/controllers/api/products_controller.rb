class Api::ProductsController < ApplicationController
  def index
    puts id
    @product = Product.find_by params[:id]
    render json: @product
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      # how does this work with the chrome extension
      puts "product saved"
    else
      # show that there was an error
      puts "product not saved"
    end
  end

  def destroy
  end

  private

  def product_params
    params.require(:product).permit(
      :name,
      :img_url,
      :price,
      :wishlist_id
      # :category_id,
      # :rating,
      # :notes
    )
  end
end

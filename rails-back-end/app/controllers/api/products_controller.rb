class Api::ProductsController < ApplicationController
  def index
    @product4 = Product.where(params[:wishlist_id]).last(4)
    render json: @product4
  end
    
  def show
    @product = Product.find params[:id]
    render json: @product
  end

  def new
    @product = Product.new
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      puts "product saved"
    else
      puts "product not saved"
    end
  end

  def update
    @product = Product.find(params[:id])
    if params[:request] == "change bought status"
      @product.update_attributes(bought: params[:bought])
    else
      @product.update_attributes(product_params)
    end
    render json: @wishlist
  end

  def destroy
    puts "in destroy"
    @delProduct = Product.find(params[:id])
    if @delProduct.destroy
    else
      render json: @delProduct.errors
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :name,
      :img_url,
      :price,
      :wishlist_id,
      :rating,
      :note
    )
  end
end

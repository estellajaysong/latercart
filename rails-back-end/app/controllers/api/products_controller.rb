class Api::ProductsController < ApplicationController
  def index
    puts "index"
    @product = Product.find_by params[:id]
    render json: @product
  end

  def show
    puts "show"
    @product = Product.find_by params[:id]
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
    @product.update_attributes(product_params)
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

class Api::SiteSelectorsController < ApplicationController
  def index
    puts params[:site_name]
    @site_selector = SiteSelector.all
    render json: @site_selector
  end

  # def new
  #   @product = Product.new
  # end

  # def create
    # @product = Product.new(product_params)

    # if @product.save
    #   puts "product saved"
    # else
    #   puts "product not saved"
    # end
  # end
  
end

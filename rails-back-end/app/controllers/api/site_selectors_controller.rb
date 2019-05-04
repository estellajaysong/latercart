class Api::SiteSelectorsController < ApplicationController
  def index
    @site_selector = SiteSelector.where(site_name:params[:site_name])
    render json: @site_selector
  end

  # def new
  #   @product = Product.new
  # end

  # def create
  #   @product = Product.new(product_params)

  #   if @product.save
  #     puts "product saved"
  #   else
  #     puts "product not saved"
  #   end
  # end

  def site_selector_params
    params.require(:site_selector).permit(
      :site_name,
      :title_tag,
      :price_tag,
      :img_tag,
    )
  end
  
end

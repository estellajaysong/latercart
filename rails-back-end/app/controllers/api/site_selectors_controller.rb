class Api::SiteSelectorsController < ApplicationController
  def index
    @site_selector = SiteSelector.where(site_name:params[:site_name])
    render json: @site_selector
  end

  # def new
  #   @product = Product.new
  # end

  # def create
  
  def site_selector_params
    params.require(:site_selector).permit(
      :site_name,
      :title_tag,
      :price_tag,
      :img_tag,
    )
  end
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # root to: 'wishlists#index'
  namespace :api do
    # get '/data', to: 'tests#index'
    get '/wishlists', to: 'wishlists#index'
    #resources :wishlists, only: [:index, :show, :create]
  
  end
end

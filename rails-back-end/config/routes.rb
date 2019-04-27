Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: 'wishlists#index'
  namespace :api do
    resources :wishlists
  end
end

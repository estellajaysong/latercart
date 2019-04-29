Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: 'wishlists#index'
  namespace :api do
    resources :wishlists
    resources :users, only: [:new, :create]
    
    get '/login' => 'sessions#new'
    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'
    post '/user_token' => 'user_token#create'
  end
end

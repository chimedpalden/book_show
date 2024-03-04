Rails.application.routes.draw do
  get 'users/index'
  root 'dashboard#index'
  get 'dashboard/index'
  namespace :api do
    get '/movies', to: 'movies#index'
    get '/bookings', to: 'bookings#index'
    delete '/bookings/:id', to: 'bookings#destroy'
    resource :bookings, only: [:create]
  end
  resources :users, only: %i[index create]
  resource :session, only: [:create, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # get "*path" => redirect("/")
end

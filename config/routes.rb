Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'api/v1/registrations',
    sessions: 'api/v1/sessions'
  }, defaults: { format: :json }
  
  namespace :api do
    namespace :v1 do
      resources :surveys do
        resources :questions, only: [:index, :create]
      end
      resources :questions, only: [:show, :update, :destroy]
      resources :survey_assignments
    end
  end
end
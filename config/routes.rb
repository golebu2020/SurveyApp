Rails.application.routes.draw do
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
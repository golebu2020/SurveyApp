module Api
  module V1
    class BaseController < ApplicationController
      include ActionController::Cookies
      include Pundit::Authorization
      before_action :authenticate_user!

      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

      private

      def user_not_authorized
        render json: { error: "You are not authorized to perform this action." }, status: :forbidden
      end
    end
  end
end
module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        user = User.find_by(email: params[:user][:email].downcase.strip)
        
        if user&.valid_password?(params[:user][:password])
          sign_in(user)
          render json: {
            status: { 
              code: 200, 
              message: 'Logged in successfully.' 
            },
            data: {
              user: UserSerializer.new(user).serializable_hash[:data][:attributes],
              token: request.env['warden-jwt_auth.token']
            }
          }
        else
          render json: { 
            error: 'Invalid email or password' 
          }, status: :unauthorized
        end
      end
    end
  end
end
module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        # Safest parameter parsing with multiple fallbacks
        user_params = params[:user] || params.dig(:session, :user) || params.dig(:auth) || {}
        email = user_params[:email]&.downcase&.strip
        password = user_params[:password]

        unless email && password
          return render json: { error: 'Email and password are required' }, status: :unprocessable_entity
        end

        user = User.find_by(email: email)
        
        if user&.valid_password?(password)
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
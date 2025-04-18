module Api
  module V1
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        jwt_token = request.env['warden-jwt_auth.token']
        
        render json: {
          status: { code: 200, message: 'Logged in successfully.' },
          data: {
            user: UserSerializer.new(resource).serializable_hash[:data][:attributes],
            token: jwt_token
          }
        }
      end
    end
  end
end
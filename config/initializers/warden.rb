Warden::JWTAuth.configure do |config|
  config.secret = Rails.application.credentials.secret_key_base
  config.dispatch_requests = [['POST', %r{^/users/sign_in$}]]
  config.revocation_requests = [['DELETE', %r{^/users/sign_out$}]]
end
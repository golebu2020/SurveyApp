class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  enum :role, { admin: 'admin', manager: 'manager', user: 'user' }, suffix: true


  
  validates :role, presence: true, inclusion: { in: roles.keys }

   # Validations
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
end
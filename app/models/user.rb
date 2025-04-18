class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  # Role enum
  enum :role, { admin: 'admin', manager: 'manager', user: 'user' }, suffix: true

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: roles.keys }

  def self.find_for_database_authentication(conditions)
    conditions = conditions.dup
    email = conditions.delete(:email).downcase.strip
    find_by(email: email)
  end

  def admin?
    role == 'admin'
  end

  def manager?
    role == 'manager'
  end

  def user?
    role == 'user'
  end
  
end

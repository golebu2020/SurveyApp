class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { admin: 'admin', manager: 'manager', user: 'user' }

  validates :role, presence: true, inclusion: { in: roles.keys }
end
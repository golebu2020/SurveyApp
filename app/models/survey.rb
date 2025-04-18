class Survey < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :survey_assignments, dependent: :destroy

  validates :name, presence: true
  validates :status, inclusion: { in: %w[NEW ASSIGNED COMPLETED] }
end
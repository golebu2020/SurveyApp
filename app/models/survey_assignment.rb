class SurveyAssignment < ApplicationRecord
  belongs_to :survey

  validates :assigned_to, presence: true
  validates :assigned_by, presence: true
end
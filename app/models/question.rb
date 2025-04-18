class Question < ApplicationRecord
  belongs_to :survey

  validates :label, presence: true
  validates :data_type, presence: true
end
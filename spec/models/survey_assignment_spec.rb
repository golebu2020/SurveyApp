require 'rails_helper'

RSpec.describe SurveyAssignment, type: :model do
  let(:admin) { create(:user, role: 'admin') }
  let(:manager) { create(:user, role: 'manager') }
  let(:user) { create(:user, role: 'user') }
  let(:survey) { create(:survey, created_by: admin.id) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      assignment = build(:survey_assignment, survey: survey, assigned_to: user.id, assigned_by: manager.id)
      expect(assignment).to be_valid
    end

    it 'is invalid without assigned_to' do
      assignment = build(:survey_assignment, assigned_to: nil)
      expect(assignment).not_to be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a survey' do
      assignment = create(:survey_assignment, survey: survey)
      expect(assignment.survey).to eq(survey)
    end
  end
end
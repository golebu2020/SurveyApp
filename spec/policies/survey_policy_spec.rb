require 'rails_helper'

RSpec.describe SurveyPolicy do
  let(:admin) { create(:user, role: 'admin') }
  let(:manager) { create(:user, role: 'manager') }
  let(:user) { create(:user, role: 'user') }
  let(:other_user) { create(:user, role: 'user') }
  let(:survey) { create(:survey, created_by: manager.id) }

  
  permissions :index? do
    it 'allows access to all users' do
      expect(SurveyPolicy.new(user, survey)).to permit(:index)
    end
  end

  permissions :show? do
    it 'allows admin to see any survey' do
      expect(SurveyPolicy.new(admin, survey)).to permit(:show)
    end

    it 'allows manager to see their own surveys' do
      expect(SurveyPolicy.new(manager, survey)).to permit(:show)
    end

    it 'allows user to see assigned surveys' do
      create(:survey_assignment, survey: survey, assigned_to: user.id)
      expect(SurveyPolicy.new(user, survey)).to permit(:show)
    end

    it 'denies user access to unassigned surveys' do
      expect(SurveyPolicy.new(other_user, survey)).not_to permit(:show)
    end
  end
end
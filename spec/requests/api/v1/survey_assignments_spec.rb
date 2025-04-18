require 'rails_helper'

RSpec.describe 'Api::V1::SurveyAssignments', type: :request do
  let(:admin) { create(:user, role: 'admin') }
  let(:manager) { create(:user, role: 'manager') }
  let(:user) { create(:user, role: 'user') }
  let(:survey) { create(:survey, created_by: admin.id) }
  let(:valid_attributes) { { survey_id: survey.id, assigned_to: user.id, assigned_by: manager.id } }

  before do
    sign_in admin
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new SurveyAssignment' do
        expect {
          post api_v1_survey_assignments_url,
               params: { survey_assignment: valid_attributes },
               headers: { 'Authorization': "Bearer #{@token}" },
               as: :json
        }.to change(SurveyAssignment, :count).by(1)
      end

      it 'returns a 201 status code' do
        post api_v1_survey_assignments_url,
             params: { survey_assignment: valid_attributes },
             headers: { 'Authorization': "Bearer #{@token}" },
             as: :json
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      SurveyAssignment.create! valid_attributes
      get api_v1_survey_assignments_url,
          headers: { 'Authorization': "Bearer #{@token}" },
          as: :json
      expect(response).to be_successful
    end
  end
end
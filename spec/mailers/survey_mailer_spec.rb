require 'rails_helper'

RSpec.describe SurveyMailer, type: :mailer do
  let(:user) { create(:user) }
  let(:survey) { create(:survey) }
  let(:mail) { SurveyMailer.survey_assigned(user, survey) }

  describe 'survey_assigned' do
    it 'renders the headers' do
      expect(mail.subject).to eq('New Survey Assigned')
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(['from@example.com'])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(survey.name)
    end
  end
end
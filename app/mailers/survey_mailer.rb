class SurveyMailer < ApplicationMailer
  def survey_assigned(user, survey)
    @user = user
    @survey = survey
    mail(to: @user.email, subject: "New Survey Assigned")
  end
end
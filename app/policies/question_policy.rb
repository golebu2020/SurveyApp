class QuestionPolicy < ApplicationPolicy
  def create?
    user.admin? || (user.manager? && record.survey.created_by == user.id)
  end

  def update?
    user.admin? || (user.manager? && record.survey.created_by == user.id)
  end

  def destroy?
    user.admin?
  end
end
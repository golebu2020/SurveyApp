class SurveyPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      elsif user.manager?
        scope.where(created_by: user.id)
      else
        scope.joins(:survey_assignments).where(survey_assignments: { assigned_to: user.id })
      end
    end
  end

  def index?
    if user.admin?
      true
    elsif user.manager?
      record.created_by == user.id
    else
      record.survey_assignments.where(assigned_to: user.id).exists?
    end
  end

  def show?
    if user.admin?
      true
    elsif user.manager?
      record.created_by == user.id
    else
      record.survey_assignments.where(assigned_to: user.id).exists?
    end
  end

  def create?
    user.admin? || user.manager?
  end

  def update?
    if user.admin?
      true
    elsif user.manager?
      record.created_by == user.id
    else
      false
    end
  end

  def destroy?
    user.admin?
  end
end
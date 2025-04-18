module Api
  module V1
    class SurveyAssignmentsController < BaseController
      before_action :set_assignment, only: [:show, :update]

      def index
        @assignments = policy_scope(Assignment)
        render json: @assignments
      end

      def show
        authorize @assignment 
        render json: @assignment
      end

      def create
        @assignment = SurveyAssignment.new(assignment_params)
        authorize @assignment
        if @assignment.save
          user = User.find(@assignment.assigned_to)
          survey = @assignment.survey
          SurveyMailer.survey_assigned(user, survey).deliver_later
          render json: @assignment, status: :created
        else
          render json: @assignment.errors, status: :unprocessable_entity
        end
      end

      def update
        authorize @assignment
        if @assignment.update(assignment_params)
          render json: @assignment
        else
          render json: @assignment.errors, status: :unprocessable_entity
        end
      end

      private

      def set_assignment
        @assignment = SurveyAssignment.find(params[:id])
      end

      def assignment_params
        params.require(:survey_assignment).permit(:survey_id, :assigned_to, :assigned_by)
      end
    end
  end
end
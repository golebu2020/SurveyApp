module Api
  module V1
    class SurveyAssignmentsController < ApplicationController
      before_action :set_assignment, only: [:show, :update]

      def index
        @assignments = SurveyAssignment.all
        render json: @assignments
      end

      def show
        render json: @assignment
      end

      def create
        @assignment = SurveyAssignment.new(assignment_params)
        if @assignment.save
          render json: @assignment, status: :created
        else
          render json: @assignment.errors, status: :unprocessable_entity
        end
      end

      def update
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
module Api
  module V1
    class SurveysController < BaseController
      before_action :set_survey, only: [:show, :update, :destroy]

      def index
        @surveys = Survey.all
        render json: @surveys
      end

      def show
        render json: @survey, include: :questions
      end

      def create
        @survey = Survey.new(survey_params)
        if @survey.save
          render json: @survey, status: :created
        else
          render json: @survey.errors, status: :unprocessable_entity
        end
      end

      def update
        if @survey.update(survey_params)
          render json: @survey
        else
          render json: @survey.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @survey.destroy
        head :no_content
      end

      private

      def set_survey
        @survey = Survey.find(params[:id])
      end

      def survey_params
        params.require(:survey).permit(:name, :description, :status, :created_by)
      end
    end
  end
end
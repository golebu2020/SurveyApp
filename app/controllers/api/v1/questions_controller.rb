module Api
  module V1
    class QuestionsController < BaseController
      before_action :set_question, only: [:show, :update, :destroy]

      def index
        survey = Survey.find(params[:survey_id])
        @questions = policy_scope(survey.questions)
        render json: @questions
      end

      def show
        authorize @question
        render json: @question
      end

      def create
        survey = Survey.find(question_params[:survey_id])
        @question = survey.questions.build(question_params)
        authorize @question
        
        if @question.save
          render json: @question, status: :created
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      end

      def update
        authorize @question
        if @question.update(question_params)
          render json: @question
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @question
        @question.destroy
        head :no_content
      end

      private

      def set_question
        @question = Question.find(params[:id])
      end

      def question_params
        params.require(:question).permit(:label, :data_type, :info, :survey_id)
      end
    end
  end
end
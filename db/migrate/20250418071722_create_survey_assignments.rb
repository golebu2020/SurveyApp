class CreateSurveyAssignments < ActiveRecord::Migration[8.0]
  def change
    create_table :survey_assignments do |t|
      t.references :survey, null: false, foreign_key: true
      t.integer :assigned_to
      t.integer :assigned_by

      t.timestamps
    end
  end
end

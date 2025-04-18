class CreateSurveys < ActiveRecord::Migration[8.0]
  def change
    create_table :surveys do |t|
      t.string :name
      t.text :description
      t.string :status
      t.integer :created_by

      t.timestamps
    end
  end
end

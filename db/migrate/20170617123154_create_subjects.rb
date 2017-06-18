class CreateSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.string :name_eng
      t.integer :specialty_id
      t.integer :academic_module_id
    end
  end
end

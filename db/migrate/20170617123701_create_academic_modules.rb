class CreateAcademicModules < ActiveRecord::Migration[5.0]
  def change
    create_table :academic_modules do |t|
      t.string :name
      t.string :name_eng
    end
  end
end

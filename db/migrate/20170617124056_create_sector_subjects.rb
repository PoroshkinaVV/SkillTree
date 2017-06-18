class CreateSectorSubjects < ActiveRecord::Migration[5.0]
  def change
    create_table :sector_subjects do |t|
      t.integer :credit_units
      t.references :sector, foreign_key: true
      t.references :subject, foreign_key: true
    end
  end
end

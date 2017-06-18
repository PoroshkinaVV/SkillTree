# == Schema Information
#
# Table name: subjects
#
#  id                 :integer          not null, primary key
#  name               :string
#  name_eng           :string
#  specialty_id       :integer
#  academic_module_id :integer
#

class Subject < ApplicationRecord
  belongs_to :speciality
  belongs_to :academic_module
  scope :with_units, -> {
    joins("INNER JOIN sector_subjects ON sector_subjects.subject_id = subjects.id")
    .joins("INNER JOIN sectors ON sectors.id = sector_subjects.sector_id")
    .joins("LEFT JOIN specialties ON specialties.id = subjects.specialty_id")
    .joins("LEFT JOIN academic_modules ON academic_modules.id = subjects.academic_module_id")
    .select(
      "subjects.*,
      sector_subjects.credit_units,
      specialties.direction,
      specialties.code,
      academic_modules.name as module_name,
      sectors.name as sector_name
      "
    )
  }
end

require 'csv'

subjects_csv = open("#{Rails.root}/db/subjects.csv").read


def find_or_create_sector(hash)
  Sector.find_or_create_by(name: hash[:sector]) do |s|
    s.name_eng = hash[:sector_eng]
  end
end

def find_or_create_academic_module(hash)
  AcademicModule.find_or_create_by(name: hash[:module]) do |s|
    s.name_eng = hash[:module_eng]
  end
end

CSV.parse(subjects_csv, col_sep: ";", headers: true).each do |row|
  hash = row.to_hash.symbolize_keys
  hash[:module] = hash[:module].gsub(" модуль", "")
  sector = find_or_create_sector(hash)
  academic_module = find_or_create_academic_module(hash)
  specialty = Specialty.find_by(code: hash[:sp_code])

  subject = Subject.create(
    name: hash[:discipline_name_clean],
    name_eng: hash[:discipline_name_eng_clean],
    academic_module_id: academic_module.id,
    specialty_id: specialty.try(:id)
  )
  print("\r #{subject.id}")
  SectorSubjects.create(
    sector_id: sector.id,
    subject_id: subject.id,
    credit_units: hash[:credit_units]
  )
end
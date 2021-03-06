# == Schema Information
#
# Table name: link_specialty_disciplines
#
#  id                :integer          not null, primary key
#  term              :integer
#  htype             :integer
#  human_htype       :string
#  specialty_id      :integer
#  discipline_id     :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  hours             :integer
#  human_short_htype :string
#  term_number       :integer
#

class LinkSpecialtyDiscipline < ApplicationRecord
  belongs_to :specialty
  belongs_to :discipline
end

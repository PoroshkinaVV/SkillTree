module Api
  class SubjectsController < ApplicationController
    def index
      filter = filter_params
      @subjects = Subject.with_units.where(filter).order(:name)
      render json: @subjects
    end

    def search
      query = params[:query]
      @subjects = case
      when query.present?
        Subject.with_units.where("subjects.name ILIKE ?", "%#{query}%")
      else
        []
      end
      render json: @subjects
    end
    def filter_params
      permitted_params = [:id, academic_modules: [:name]]

      params.permit(permitted_params)
    end
  end
end

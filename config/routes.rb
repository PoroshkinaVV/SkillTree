Rails.application.routes.draw do
  devise_for :users
  resources :link_specialty_disciplines
  resources :specialties
  resources :disciplines

  get 'disciplines/by_specialty/:id' => 'disciplines#by_specialty'

  root 'specialties#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :specialties do
      get 'disciplines', on: :member
      get 'group_list', on: :collection
    end
    get 'disciplines' => 'disciplines#index'
  end
end

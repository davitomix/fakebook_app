Rails.application.routes.draw do
  # devise_scope :user do
  #   root :to => 'devise/sessions#new'
  # end
  root 'static_pages#home'
  get  '/home',   to: 'static_pages#home'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup'}, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :posts do
    resources :like_posts, only: %i[create destroy]
    resources :comments, only: %i[create show] do
      resources :like_comments, only: %i[create destroy]
    end
  end
  resources :users, only: %i[index show]
  get 'friendships/create'
  get 'friendships/destroy'
  get 'friendships/update' => 'friendships#update'
  # resources :friendships, only: %i[create destroy update]
  # get 'users/index'
end

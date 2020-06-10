Rails.application.routes.draw do
  root to: 'users#index'
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'signup'}, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  resources :posts do
    resources :like_posts, only: %i[create destroy]
    resources :comments, only: %i[create] do
      resources :like_comments, only: %i[create destroy]
    end
  end
  resources :users, only: %I[index show]
  get 'friendships/create'
  get 'friendships/destroy'
  get 'friendships/update' => 'friendships#update', status: :accepted
  get 'friendships/edit' => 'friendships#edit', status: :reject
  # resources :friendships, only: %i[create destroy update]
  # get 'users/index'
end

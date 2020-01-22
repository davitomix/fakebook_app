class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?, only: %i[update create]
  protect_from_forgery with: :exception

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
end

class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: %i[home]
  def home
  end

  def about
  end

  def contact
  end
end

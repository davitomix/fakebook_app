class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: %i[home]
  def home
    return unless user_signed_in?

    @post = current_user.posts.build
  end

  def about
  end

  def contact
  end
end

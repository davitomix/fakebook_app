class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: %i[home]
  def home
    return unless user_signed_in?

    @post = current_user.posts.build
    @feed_items = current_user.posts.paginate(page: params[:page], per_page: 10)
  end

  def about
  end

  def contact
  end
end

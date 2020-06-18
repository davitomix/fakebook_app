class StaticPagesController < ApplicationController
  def home
    return unless user_signed_in?

    @post = current_user.posts.build
    @feed_items = current_user.friends_and_own_posts.sort_by(&:created_at).reverse
    @feed_items = @feed_items.paginate(page: params[:page], per_page: 10)
  end

  def about
  end

  def contact
  end
end

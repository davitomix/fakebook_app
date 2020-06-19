class StaticPagesController < ApplicationController
  def home
    return unless user_signed_in?

    @post = current_user.posts.build
    @feed_items = current_user.friends_and_own_posts.sort_by(&:created_at).reverse
    @feed_items = @feed_items.take(30).paginate(page: params[:feed_items_page], per_page: 10)
    @who_friends = User.all - current_user.current_friends.take(15)
    @who_friends = @who_friends.paginate(page: params[:who_friend_page], per_page: 5)
  end

  def about
  end

  def contact
  end
end

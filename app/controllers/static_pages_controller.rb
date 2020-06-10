class StaticPagesController < ApplicationController
  def home
    @comments = Comment.all
    @users = User.all
    @posts = current_user.friends_and_own_posts
  end

  def about
  end

  def contact
  end
end

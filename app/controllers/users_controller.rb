class UsersController < ApplicationController
  def index
    @users = User.all
    @following = current_user.active_following
    @followers = current_user.active_followers
    @pending_followers = current_user.pending_followers
    @all_users = (@users - @following - @followers - @pending_followers - [current_user]).sort_by(&:id)
  end

  def show
    @user = User.find(params[:id])
    @posts_items = Post.where(user_id: @user.id).sort_by(&:created_at).reverse
    @posts_items = @posts_items.paginate(page: params[:page], per_page: 10)
  end
end

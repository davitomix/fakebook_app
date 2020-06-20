class LikeCommentsController < ApplicationController
  before_action :find_comment
  before_action :find_like, only: :destroy

  def create
    if already_liked?
      flash[:notice] = "You can't like more than once"
    else
      @comment.like_comments.create(user: current_user)
      flash[:notice] = 'Comment liked.'
    end
    redirect_to @comment.post
  end

  def destroy
    if !already_liked?
      flash[:notice] = "Can't unlike"
    else
      @like_comment.destroy
      flash[:notice] = 'Comment disliked.'
    end
    redirect_to @comment.post
  end

  private

  def find_comment
    @comment = Comment.find(params[:comment_id])
  end

  def find_like
    @like_comment = LikeComment.where(user_id: current_user.id, comment_id: params[:comment_id]).first
  end

  def already_liked?
    LikeComment.where(user_id: current_user.id, comment_id: params[:comment_id]).exists?
  end
end

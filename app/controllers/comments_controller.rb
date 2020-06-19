class CommentsController < ApplicationController
  # GET /posts
  # GET /posts.json
  def index
    @comments = Comment.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @comment = Comment.find(params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      redirect_to @comment.post
      flash[:notice] = 'Comment was successfully created.'
    else
      flash[:notice] = 'Internal Error.'
      redirect_back(fallback_location: @comment.post)
    end
  end

  def comment_params
    params.require(:comment).permit(:content, :user_id, :post_id)
  end
end

class FriendshipsController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: %i[update destroy]

  def create
    following = current_user.following_friends.new(friendship_params)
    flash[:alert] = "Couldn't be friend #{friendship_params[:requestee_id]}" unless following.save
    redirect_back fallback_location: root_path
  end

  def destroy
    requestee = User.find(params[:requestee_id])
    current_user.remove_friendship(requestee.id)
    requestee.remove_friendship(current_user.id)
    redirect_back fallback_location: root_path
  end

  def update
    requester = User.find(params[:requester_id])
    request = current_user.followers_friends.find_by(requester: requester)
    if params[:status] == 'accepted'
      if request.update(status: 'accepted')
        Friendship.create(requester: current_user, requestee: requester, status: 1)
        flash[:notice] = 'Friend confirmed'
      else
        flash[:alert] = 'Something went wrong'
      end
    elsif params[:status] == 'rejected'
      if request.update(status: 'rejected')
        Friendship.create(requester: current_user, requestee: requester, status: 2)
        flash[:notice] = 'Request rejected!'
      else
        flash[:alert] = 'Something went wrong'
      end
    end
    redirect_back fallback_location: root_path
  end

  private

  def friendship_params
    params.permit(:requestee_id, :status)
  end

  def correct_user
    user = User.find_by(id: params[:requester_id])
    redirect_to(user) unless current_user
  end
end

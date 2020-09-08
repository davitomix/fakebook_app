module UsersHelper
  # Returns the Gravatar for the given user.
  def gravatar_for(user, size: 70)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.email, class: 'gravatar')
  end

  def send_friend_request_button(user)
    out = ''
    if current_user.pending_following.include? user
      out << link_to('Cancel request', friendships_destroy_path(requestee_id: user.id))
    elsif current_user.rejected_followings.include?(user) || current_user.rejected_followers.include?(user)
      out << link_to('Remove request', friendships_destroy_path(requestee_id: user.id))
    elsif current_user.pending_followers.include?(user)
      out << link_to('Accept', friendships_update_path(requester_id: user.id, status: 'accepted'))
      out << link_to('Reject', friendships_update_path(requester_id: user.id, status: 'rejected'))
    else
      out << link_to('Send request', friendships_create_path(requestee_id: user.id))
    end
    out.html_safe
  end
end

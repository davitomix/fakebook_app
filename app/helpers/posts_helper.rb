module PostsHelper
  def current_user_post?(post)
    current_user == post.user ? true : false
  end

  def view_profile_button(post)
    out = ''
    if current_user == post.user
      out << link_to("View my profile", post.user)
    else
      out << link_to("View profile", post.user)
    end
    out.html_safe
  end
end

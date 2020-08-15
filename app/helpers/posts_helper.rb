module PostsHelper
  def current_user_post?(post)
    current_user == post.user ? true : false
  end
end

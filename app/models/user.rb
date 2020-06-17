class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :liked_posts, dependent: :destroy
  has_many :like_comments, dependent: :destroy
  has_many :comments

  friendship_scope = -> { includes(:requester, :requestee).order('users.id') }
  has_many :following_friends, friendship_scope, foreign_key: 'requester_id', class_name: :Friendship
  has_many :followers_friends, friendship_scope, foreign_key: 'requestee_id', class_name: :Friendship

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:facebook]

  # Requests made by others to current_user
  def active_followers
    followers_friends.where(status: :accepted).map(&:requester)
  end

  def pending_followers
    followers_friends.where(status: :pending).map(&:requester)
  end

  # Requests made by current_user to others
  def pending_following
    following_friends.where(status: :pending).map(&:requestee)
  end

  def active_following
    following_friends.where(status: :accepted).map(&:requestee)
  end

  def rejected_followings
    following_friends.where(status: :rejected).map(&:requestee)
  end

  def rejected_followers
    followers_friends.where(status: :rejected).map(&:requester)
  end

  def feed
    followers_friends.where(status: :accepted).map(&:requester_id)
  end

  def remove_friendship(friend_id)
    following_friends.find_by_requestee_id(friend_id)&.destroy ||
      followers_friends.find_by_requester_id(friend_id)&.destroy
  end

  def friends_and_own_posts
    (Post.where(user: feed) + Post.where(user: id)).sort_by(&:updated_at)
    # This will produce SQL query with IN. Something like: select * from posts where user_id IN (1,45,874,43);
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.password_confirmation = user.password
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if (data = session['devise.facebook_data'] && session['devise.facebook_data']['extra']['raw_info'])
        user.email = data['email'] if user.email.blank?
      end
    end
  end

  def self.find_or_create_by_omniauth(auth_hash)
    where(email: auth_hash['info']['email']).first_or_create do |u|
      u.password = SecureRandom.hex
    end
  end
end

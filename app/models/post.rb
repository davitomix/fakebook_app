class Post < ApplicationRecord
  belongs_to :user
  has_many :liked_posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :content, presence: true, length: { in: 1..1500 }
  validates :user, presence: true

  def likes_count
    liked_posts.where(post_id: id).count
  end

  def comments_count
    comments.where(post_id: id).count
  end
end

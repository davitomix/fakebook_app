class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :like_comments, dependent: :destroy

  validates :post, presence: true
  validates :content, presence: true, length: { maximum: 255 }

  def likes_count
    like_comments.where(comment_id: id).count
  end
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :liked_posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :content, presence: true, length: { in: 1..1500 }
  validates :user, presence: true
end

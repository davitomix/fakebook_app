# This file should contain all the record creation needed to seed the database
# with its default values.
# The data can then be loaded with the rails db:seed command (or created
# alongside the database with db:setup).
#
# Examples:
#
#  movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#  Character.create(name: 'Luke', movie: movies.first)
User.create!(email: 'example@railstutorial.org',
             password: 'foobar',
             name: 'Sudo',
             password_confirmation: 'foobar')

9.times do |n|
  username  = Faker::Name.name
  email = "example-#{n + 1}@railstutorial.org"
  password = 'password'
  User.create!(email: email,
               name: username,
               password: password,
               password_confirmation: password)
end

users = User.all
15.times do
  users.each do |user|
    content = Faker::Lorem.sentence(45)
    user.posts.create(content: content)
  end
end

u1 = User.first
u2 = User.second

for i in (2..8)
  u1.following_friends.new(requestee_id: i, status: "accepted").save
  Friendship.new(requester_id: i, requestee_id: 1, status: "accepted").save
end

for i in (6...10)
  u2.followers_friends.new(requester_id: i).save
end

for i in (3...5)
  u2.following_friends.new(requestee_id: i).save
end

posts = Post.all

posts.each do |post|
  users.each do |user|
    post.liked_posts.create(user: user)
    content = Faker::Lorem.sentence(25)
    post.comments.create(content: content, user_id: user.id)
  end
end

posts.each do |post|
  users.each do |user|
    content = Faker::Lorem.sentence(25)
    post.comments.create(content: content, user_id: user.id)
  end
end


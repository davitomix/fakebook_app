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
             password_confirmation: 'foobar')

9.times do |n|
  username  = Faker::Name.name
  email = "example-#{n + 1}@railstutorial.org"
  password = 'password'
  User.create!(email: email,
               password: password,
               password_confirmation: password)
end

users = User.all
15.times do
  users.each do |user|
    content = Faker::Lorem.sentence(15)
    user.posts.create(content: content)
  end
end

u1 = User.first

for i in (2..8)
  u1.following_friends.new(requestee_id: i, status: "accepted").save
  Friendship.new(requester_id: i, requestee_id: 1, status: "accepted").save
end



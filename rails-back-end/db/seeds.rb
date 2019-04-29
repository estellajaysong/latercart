# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

puts "Creating users..."

user1 = User.create!({
  username: 'Alice',
  email: 'a@a.com',
  password: 'a'
})

user2 = User.create!({
  username: 'Bob',
  email: 'b@b.com',
  password: 'b'
})

user3 = User.create!({
  username: 'Kate',
  email: 'k@k.com',
  password: 'k'
})

puts "Creating wishlists..."

Wishlist.create!({
  name: "Vacation"
})
Wishlist.create!({
  name: "Home"
})
Wishlist.create!({
  name: "Apparel"
})
Wishlist.create!({
  name: "Wedding"
})
Wishlist.create!({
  name: "Baby shower"
})

puts "Creating user-wishlist relationship..."

UserWishlist.create!({
  user_id:1,
  wishlist_id:1
})

UserWishlist.create!({
  user_id:1,
  wishlist_id:2
})

UserWishlist.create!({
  user_id:2,
  wishlist_id:3
})

UserWishlist.create!({
  user_id:2,
  wishlist_id:4
})

UserWishlist.create!({
  user_id:3,
  wishlist_id:5
})

puts "Done!"
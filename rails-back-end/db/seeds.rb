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

puts "Creating Users..."

user1 = User.create!({
  name: 'Alice',
  email: 'a@a.com',
  password: 'a'
})

user2 = User.create!({
  name: 'Bob',
  email: 'b@b.com',
  password: 'b'
})

user3 = User.create!({
  name: 'Kate',
  email: 'k@k.com',
  password: 'k'
})

puts "Creating wishlists for users..."

user1.wishlists.create!({
  name: "Vacation"
})
user1.wishlists.create!({
  name: "Home"
})
user1.wishlists.create!({
  name: "Apparel"
})
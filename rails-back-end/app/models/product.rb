class Product < ApplicationRecord
  belongs_to :wishlist, category

  has_many :category
  has_many
end

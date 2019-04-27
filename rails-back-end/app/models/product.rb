class Product < ApplicationRecord
  belongs_to :wishlist, category

  has_many :category
end

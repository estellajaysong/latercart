class User < ApplicationRecord
  has_secure_password validations: false
  has_many :user_wishlists

  def to_token_payload
    {
      sub: id,
      name: username
    }
  end

  # def self.from_token_payload payload
  #   # Returns a valid user, `nil` or raise
  #     self.find payload["sub"]
  # end
  
end

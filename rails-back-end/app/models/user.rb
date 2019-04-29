class User < ApplicationRecord
  has_secure_password validations: false

  def to_token_payload
    {
      sub: id,
      name: username
    }
  end
  
end

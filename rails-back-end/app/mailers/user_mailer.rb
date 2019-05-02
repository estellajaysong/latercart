class UserMailer < ApplicationMailer
  def share_wishlist_email(user, sender)
    @mailUser = user
    @sender = sender
    mail(to: @mailUser.email, subject: "You are invited to #{@sender.username}'s awesome wishlist")
  end
end

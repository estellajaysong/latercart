class Api::UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token, raise: false
  # before_action :authenticate_user
 
  # def index
  #   if current_user
  #     # do something
  #     puts 'current user..............'
  #   else
  #     # do something else
  #     puts 'no current user..............'
  #   end
  # end
  # def current_user
  #   @current_user ||= User.find_by(email: params[:auth][:email])
  # end
  # puts "================ #{current_user.id}"
end

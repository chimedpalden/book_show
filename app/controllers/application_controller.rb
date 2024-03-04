class ApplicationController < ActionController::Base
  protect_from_forgery

  def respond_with_error(error, status = :unprocessable_entity, context = {})
    error_message = error
    is_exception = error.kind_of?(StandardError)
    if is_exception
      is_having_record = error.methods.include? "record"
      error_message = is_having_record ? message.record&.errors.full_messages.to_sentence : error.message
    end
    render status: status, json: { error: error_message }.merge(context)
  end

  def respond_with_success(message, status = :ok, context = {})
    render status: status, json: { notice: message }.merge(context)
  end

  def respond_with_json(json = {}, status = :ok)
    render status: status, json: json
  end

  def verify_token
    # binding.break
    user_email = request.headers["X-Auth-Email"].presence
    auth_token = request.headers["X-Auth-Token"].presence
    user = user_email && User.find_by!(email: user_email)
    is_valid_token = user && auth_token && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, auth_token)
    if is_valid_token
      @current_user = user
    else
      respond_with_error("Could not authenticate with the provided credentials", :unauthorized)
    end
  end

  def current_user
    @current_user
  end
end

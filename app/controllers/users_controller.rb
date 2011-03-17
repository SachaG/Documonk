class UsersController < ApplicationController
  before_filter :set_user, :only => [:show, :edit, :update, :destroy]
  load_and_authorize_resource

  def index
    @title = "All users"
    @users = User.all
    authorize! :read, @user
  end

  def show
    @documents = @user.documents
  end

  
  def edit
    get_all_roles
    @title = "Edit user"
    authorize! :update, @user
  end

  def update
    get_all_roles
    #see http://www.tonyamoyal.com/2010/09/29/rails-authentication-with-devise-and-cancan-part-2-restful-resources-for-administrators/
    #if params[:user][:password].blank?
    #  [:password].collect{|p| params[:user].delete(p) }
    #end
    
    if @user.update_attributes(params[:user])
      flash[:success] = "Profile updated."
      redirect_to @user
    else
      @title = "Edit user"
      render 'edit'
    end
  end
  
  def destroy
    @user.destroy
    flash[:success] = "User destroyed."
    redirect_to users_path
  end
 
  def get_all_roles
    @roles = Role.find(:all)
  end


  private
    
    def set_user
      @user = User.find(params[:id])
    end

end

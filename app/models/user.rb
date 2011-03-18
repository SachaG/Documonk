class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :twitter_account, :role_list
  
  has_many :documents, :dependent => :destroy
  has_many :notes
 
  has_and_belongs_to_many :roles

  #see http://ramblings.gibberishcode.net/archives/rails-has-and-belongs-to-many-habtm-demystified/17
  attr_accessor :role_list
  #after_save is called every time you create a new session? check this
  after_save :update_roles
  
  def role?(role)
    #see http://stackoverflow.com/questions/3994033/ruby-operator-a-k-a-the-double-bang
      return !!self.roles.find_by_name(role.to_s)
  end
  
  def role!()
    #hack: return "user" if no role is set -> should check this when user is created instead
    if self.roles[0].nil?
      return "user"
    else
      return self.roles[0].name
    end
  end
  
  protected
  
      def password_required?
        !persisted? || password.present? || password_confirmation.present?
      end
  
  private 

      def update_roles
        # puts "roles => #{role_list.inspect}"
        unless role_list.nil?
          roles.delete_all
          selected_roles = role_list.keys.collect{|id| Role.find_by_id(id)}
          selected_roles.each {|role| self.roles << role}
        end
      end
end

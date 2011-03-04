class AddTwitteraccountToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :twitteraccount, :string
  end

  def self.down
    remove_column :users, :twitteraccount
  end
end

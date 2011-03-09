class AddUserIdToNotes < ActiveRecord::Migration
  def self.up
    add_column :notes, :user_id, :id
  end

  def self.down
    remove_column :notes, :user_id
  end
end

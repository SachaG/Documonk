class AddStatsCodeToDocuments < ActiveRecord::Migration
  def self.up
    add_column :documents, :stats_code, :string
  end

  def self.down
    remove_column :documents, :stats_code
  end
end

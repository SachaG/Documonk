class ChangeDataTypeForDocumentContent < ActiveRecord::Migration
 def self.up
    change_table :documents do |t|
      t.change :content, :text
    end
  end

  def self.down
  end
end

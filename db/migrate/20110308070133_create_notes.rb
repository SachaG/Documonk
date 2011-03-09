class CreateNotes < ActiveRecord::Migration
  def self.up
    create_table :notes do |t|
      t.string :content
      t.string :type
      t.string :position
      t.integer :document_id

      t.timestamps
    end
  end

  def self.down
    drop_table :notes
  end
end

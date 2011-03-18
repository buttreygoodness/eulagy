class Company
  include DataMapper::Resource

  property :id,           Serial
  property :name,         String
  property :created_at,   DateTime
  property :updated_at,   DateTime
  
  has n, :applications

  validates_presence_of :name
  validates_uniqueness_of :name
end
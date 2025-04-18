FactoryBot.define do
  factory :survey do
    name { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    status { 'active' }
    association :created_by, factory: :user
  end
end
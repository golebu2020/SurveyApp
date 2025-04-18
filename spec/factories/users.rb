FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password123' }
    role { 'user' } # default role

    trait :admin do
      role { 'admin' }
    end

    trait :manager do
      role { 'manager' }
    end
  end
end
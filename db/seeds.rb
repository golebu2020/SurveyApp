# Create users
User.destroy_all 

User.create!(
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin'
)

User.create!(
  email: 'manager@example.com',
  password: 'password123',
  role: 'manager'
)

User.create!(
  email: 'user@example.com',
  password: 'password123',
  role: 'user'
)

puts "Created #{User.count} users"

# Set variables
admin   = User.find_by(email: 'admin@example.com')
manager = User.find_by(email: 'manager@example.com')
user    = User.find_by(email: 'user@example.com')

survey1 = Survey.create!(
  name: 'Employee Satisfaction',
  description: 'Survey to measure employee satisfaction',
  status: 'NEW',
  created_by: admin.id
)

survey2 = Survey.create!(
  name: 'Product Feedback',
  description: 'Survey to gather product feedback',
  status: 'ASSIGNED',
  created_by: manager.id
)

Question.create!([
  {
    label: 'How satisfied are you with your job?',
    data_type: 'scale',
    info: 'Rate from 1 to 10',
    survey: survey1
  },
  {
    label: 'What could improve your work environment?',
    data_type: 'text',
    info: 'Open-ended feedback',
    survey: survey1
  },
  {
    label: 'How often do you use our product?',
    data_type: 'multiple_choice',
    info: 'Select one option',
    survey: survey2
  }
])

SurveyAssignment.create!(
  survey: survey2,
  assigned_to: user.id,
  assigned_by: manager.id
)
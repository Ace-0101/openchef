from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(first_name='Demo', last_name='Test', email='demo@aa.io', city='Houston',
                hashed_password= ('password'))

    demo_chef = User(first_name='Chef', last_name='Demo', email='demo_chef@aa.io', city='Houston', chef_id=4,
                hashed_password = ('password'))

    db.session.add(demo)
    db.session.add(demo_chef)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

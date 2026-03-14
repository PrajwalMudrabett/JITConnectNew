import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Job from './models/Job.js';
import Research from './models/Research.js';
import Event from './models/Event.js';
import Announcement from './models/Announcement.js';

dotenv.config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const jobCount = await Job.countDocuments();
    const researchCount = await Research.countDocuments();
    const eventCount = await Event.countDocuments();
    const announcementCount = await Announcement.countDocuments();

    console.log('📊 Database Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Posts: ${postCount}`);
    console.log(`   Jobs: ${jobCount}`);
    console.log(`   Research: ${researchCount}`);
    console.log(`   Events: ${eventCount}`);
    console.log(`   Announcements: ${announcementCount}\n`);

    // Show admin users
    const admins = await User.find({ isAdmin: true }).select('name email role');
    console.log('👑 Admin Users:');
    if (admins.length > 0) {
      admins.forEach(admin => {
        console.log(`   - ${admin.name} (${admin.email}) - ${admin.role}`);
      });
    } else {
      console.log('   No admin users found');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();

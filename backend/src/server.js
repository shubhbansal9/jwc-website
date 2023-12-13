const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Double } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://shubhbansal44:mRdPJkyew7QiQwh2@jwc-events.t1x2tjr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.json());
app.use(cors()); 
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  location: { type: String, default: 'none' },
  registeredEventIds: [{ type: Number, ref: 'Event' }],
  amsaMember: { type: String, default: 'no' } // New field "amsaMember" with default value "no"
});

const eventSchema = new mongoose.Schema({
  eventId: { type: Number, unique: true },
  eventName: String,
  eventPrice_in: Number,
  eventPrice_us:Number,
  totalSeats: { type: Number }, 
  registeredUsers: [{ type: String, ref: 'User' }],
});


const brStatusSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  brStatus: { type: Number, default: 0 },
});
const cartSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  eventsInCart: {
    type: [Number],
    unique: true,
    // Optionally, you can use a validator function to enforce uniqueness within the array
    validate: {
      validator: function(arr) {
        return arr.length === new Set(arr).size;
      },
      message: 'Duplicate values are not allowed in eventsInCart',
    },
  },
});



const Cart = mongoose.model('Cart', cartSchema, 'carts');

const BRStatus = mongoose.model('BRStatus', { email: String, brStatus: { type: Number, default: 0 } });

const User = mongoose.model('User', userSchema, 'users');
const Event = mongoose.model('Event', eventSchema, 'events');


app.post('/api/update-amsa-status', async (req, res) => {
  try {
    const { email, amsaMember } = req.body;

    // Update the user's AMSA member status
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { amsaMember } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ success: true, message: 'AMSA member status updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/update-event-details', async (req, res) => {
  try {
    const { eventId, updatedEventDetails } = req.body;

    // Update the event details
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId },
      { $set: updatedEventDetails },
      { new: true }
    );

    if (updatedEvent) {
      res.status(200).json({ success: true, message: 'Event details updated successfully', updatedEvent });
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/add-to-cart', async (req, res) => {
  try {
    const { email, eventId } = req.body;

    // Check if a cart for the user already exists
    let cart = await Cart.findOne({ email });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ email, eventsInCart: [] });
    }

    // Add the eventId to the user's cart
    cart.eventsInCart.push(eventId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, message: 'Event added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/user-cart/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Email received:', email);

    const cart = await Cart.findOne({ email }).populate('eventsInCart');
    console.log('Cart found:', cart);

    if (!cart) {
      res.status(404).json({ success: false, message: 'User cart not found' });
      return;
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/remove-from-cart/:email/:eventId', async (req, res) => {
  try {
    const { email, eventId } = req.params;

    // Check if a cart for the user exists
    const cart = await Cart.findOne({ email });

    if (!cart) {
      res.status(404).json({ success: false, message: 'User cart not found' });
      return;
    }

    // Find the index of the event ID in the cart's eventsInCart array
    const index = cart.eventsInCart.findIndex((id) => id === parseInt(eventId));

    // If the event ID exists, remove it from the array
    if (index !== -1) {
      cart.eventsInCart.splice(index, 1);
    } else {
      res.status(404).json({ success: false, message: 'Event not found in the cart' });
      return;
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, message: 'Event removed from cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




app.post('/api/login', async (req, res) => {
  try {
    const { username, email, location } = req.body;

    const user = new User({ username, email, location });
    await user.save();

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/user-exists', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/update-br-status', async (req, res) => {
  try {
    const { email, brStatus } = req.body;

    const existingBRStatus = await BRStatus.findOne({ email });

    if (!existingBRStatus) {
      const newBRStatus = new BRStatus({ email, brStatus: brStatus || 0 });
      await newBRStatus.save();
    } else {
      existingBRStatus.brStatus = brStatus || 0;
      await existingBRStatus.save();
    }

    res.status(200).json({ success: true, message: 'BR Status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/get-br-status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const brStatus = await BRStatus.findOne({ email });

    if (!brStatus) {
      res.status(404).json({ success: false, message: 'BR Status not found for this user' });
      return;
    }

    res.status(200).json({ success: true, brStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/update-location', async (req, res) => {
  try {
    const { email, location } = req.body;

    // Update the user's location
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { location } },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({ success: true, message: 'Location updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/user-location', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, location: user.location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET request to fetch user name
app.get('/api/user-name', async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET request to fetch user BR status
app.get('/api/user-br-status', async (req, res) => {
  try {
    const { email } = req.query;

    const brStatus = await BRStatus.findOne({ email });
    if (!brStatus) {
      res.status(404).json({ success: false, message: 'BR Status not found' });
      return;
    }

    res.status(200).json({ success: true, brStatus: brStatus.brStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
app.post('/api/create-event', async (req, res) => {
  try {
    const { eventId, eventName, totalSeats, eventPrice_in, eventPrice_us } = req.body;

    // Check if event with the given eventId already exists
    const existingEvent = await Event.findOne({ eventId });
    if (existingEvent) {
      res.status(400).json({ success: false, message: 'Event with the provided ID already exists' });
      return;
    }

    // Create a new event with totalSeats provided in the request body
    const newEvent = new Event({ eventId, eventName, totalSeats, eventPrice_in, eventPrice_us });
    await newEvent.save();

    res.status(200).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
// Assuming you're using Express.js and Mongoose

// Endpoint to fetch event details by eventId
app.get('/api/events/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event by eventId in your Event model
    const event = await Event.findOne({ eventId });

    if (!event) {
      // If the event is not found, return an error
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Return the event name and price in the response
    res.status(200).json({ success: true, eventId: eventId, eventName: event.eventName, price_in: event.eventPrice_in, price_us: event.price_us, totalSeats: event.totalSeats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/update-event-registration', async (req, res) => {
  try {
    const { eventId, email } = req.body;

    // Update the event with the registered user
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId },
      { $addToSet: { registeredUsers: email }, $inc: { totalSeats: -1 } },
      { new: true }
    );

    // Update the user with the registered event ID
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $addToSet: { registeredEventIds: updatedEvent.eventId } },
      { new: true }
    );

    if (updatedEvent && updatedUser) {
      res.status(200).json({ success: true, message: 'Event registration updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Event or user not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

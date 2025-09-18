import React, { useState, useEffect, useRef } from 'react';
import {
  createTheme, ThemeProvider, CssBaseline, Container, Box, Button,
  Typography, CircularProgress, Card, CardContent, Grid, Paper, Fade, Divider, Chip, TextField, Avatar
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import CastleIcon from '@mui/icons-material/Castle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';


// --- THEME ---
const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#0052D4' },
      background: {
        default: '#EFEFBB',
        paper: 'linear-gradient(to right, #D4D3DD, #EFEFBB)',
      },
      text: { primary: '#2c3e50', secondary: '#34495e' },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h2: { fontWeight: 700 }, h4: { fontWeight: 700 }, h5: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.18)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          },
        },
      },
    },
});

// --- ITINERARY DATA ---
const itineraries = [
  {
    icon: <DownhillSkiingIcon />,
    prompt: "A weekend getaway in the mountains",
    data: {
      title: "🏔️ Your Relaxing Weekend Escape to Shimla",
      description: "Experience the colonial charm and breathtaking Himalayan vistas of the 'Queen of the Hills'.",
      flight: { details: "Flights are frequent from major cities to Chandigarh (IXC), the nearest major airport.", suggestion: "Fly IndiGo or Vistara for a comfortable morning journey." },
      accommodation: { name: "The Oberoi Cecil, Shimla", highlights: ["Heated Indoor Pool", "Colonial Architecture", "Valley View Rooms", "Spa"] },
      schedule: [
        { day: "Day 1: Arrival and Colonial Charm", activities: [{ name: "Scenic Drive to Shimla", description: "Enjoy the picturesque 3-hour drive from Chandigarh." }, { name: "Stroll on The Mall Road", description: "Spend the evening exploring the famous Mall Road and Christ Church." }] },
        { day: "Day 2: Himalayan Panoramas", activities: [{ name: "Jakhoo Temple Ropeway", description: "Take the morning ropeway for stunning panoramic views." }, { name: "Kalka-Shimla Toy Train", description: "Experience a short, scenic ride on this UNESCO World Heritage railway." }] },
      ],
      dining: [ { name: "The Devicos", specialty: "Multi-cuisine dining on The Mall Road." }, { name: "Cafe Sol", specialty: "Known for its continental dishes." }, { name: "Indian Coffee House", specialty: "A historic spot for a nostalgic snack." }]
    }
  },
  {
    icon: <KitesurfingIcon />,
    prompt: "A vibrant coastal escape",
    data: {
      title: "🌊 Your Vibrant Coastal Escape to Goa",
      description: "Discover sun-kissed beaches, vibrant nightlife, and rich Portuguese heritage in India's party capital.",
      flight: { details: "Direct flights are available to Goa's Dabolim Airport (GOI) from all major Indian cities.", suggestion: "Book an early flight to catch the sunset on your first day." },
      accommodation: { name: "W Goa, Vagator", highlights: ["Ocean Views", "Rock Pool Bar", "Away Spa", "Stylish Decor"] },
      schedule: [
        { day: "Day 1: North Goa Vibes", activities: [{ name: "Anjuna Flea Market", description: "Explore the vibrant market for souvenirs and local goods (Wednesdays only)." }, { name: "Sunset at Vagator Beach", description: "Witness a spectacular sunset from the cliffs near Chapora Fort." }] },
        { day: "Day 2: Culture and Cuisine", activities: [{ name: "Explore Fontainhas", description: "Wander through the colourful Latin Quarter of Panjim." }, { name: "Visit Basilica of Bom Jesus", description: "A UNESCO World Heritage site holding the mortal remains of St. Francis Xavier." }] },
      ],
      dining: [ { name: "Thalassa", specialty: "Iconic Greek taverna with stunning sunset views." }, { name: "Britto's", specialty: "A famous beach shack on Baga beach for seafood." }, { name: "The Black Sheep Bistro", specialty: "Modern, global cuisine in Panjim." }]
    }
  },
  {
    icon: <CastleIcon />,
    prompt: "A royal cultural journey",
    data: {
      title: "🕌 Your Royal Journey to Jaipur",
      description: "Immerse yourself in the grandeur of the Pink City, with its majestic forts, opulent palaces, and rich history.",
      flight: { details: "Jaipur International Airport (JAI) is well-connected to all major Indian cities.", suggestion: "A morning flight gives you a full day for exploration." },
      accommodation: { name: "The Raj Palace", highlights: ["Heritage Palace Hotel", "Courtyard Pools", "Antique Furnishings", "Royal Suites"] },
      schedule: [
        { day: "Day 1: The Pink City's Heart", activities: [{ name: "Hawa Mahal", description: "Visit the iconic 'Palace of Winds' and admire its intricate facade." }, { name: "City Palace", description: "Explore the vast complex of courtyards, gardens, and buildings." }] },
        { day: "Day 2: Majestic Forts", activities: [{ name: "Amber Fort", description: "Take an elephant or jeep ride up to this magnificent hilltop fort." }, { name: "Nahargarh Fort", description: "Enjoy panoramic city views, especially beautiful at sunset." }] },
      ],
      dining: [ { name: "1135 AD", specialty: "Regal fine dining inside Amber Fort." }, { name: "Laxmi Misthan Bhandar (LMB)", specialty: "Famous for traditional Rajasthani sweets and vegetarian thali." }, { name: "Chokhi Dhani", specialty: "An ethnic village resort offering an authentic cultural and dining experience." }]
    }
  },
  {
    prompt: "A spiritual retreat",
    data: {
      title: "🙏 Spiritual Retreat to Rishikesh",
      description: "Find peace by the Ganges in the yoga capital of the world.",
      flight: {
        details: "Fly to Dehradun's Jolly Grant Airport (DED), the closest airport to Rishikesh.",
        suggestion: "Many domestic flights are available; a pre-booked taxi is recommended for the 45-minute drive."
      },
      accommodation: {
        name: "Ananda in the Himalayas",
        highlights: ["Luxury Spa", "Yoga Pavilions", "Meditation Caves", "Ganges Views"]
      },
      schedule: [
        {
          day: "Day 1: Arrival & Serenity",
          activities: [
            { name: "Ganga Aarti at Triveni Ghat", description: "Witness the mesmerizing evening prayer ceremony on the banks of the Ganges." },
            { name: "Walk across Laxman Jhula", description: "Experience the iconic suspension bridge with its bustling atmosphere." }
          ]
        },
        {
          day: "Day 2: Yoga and Adventure",
          activities: [
            { name: "Morning Yoga Session", description: "Start your day with a rejuvenating yoga class at an ashram." },
            { name: "White Water Rafting", description: "For the adventurous, experience the thrilling rapids of the Ganges." }
          ]
        }
      ],
      dining: [
        { name: "The Sitting Elephant", specialty: "A rooftop restaurant with stunning river views." },
        { name: "Chotiwala", specialty: "A famous, historic spot for traditional Indian meals." }
      ]
    }
  },
  {
    prompt: "A wildlife adventure",
    data: {
      title: "🐅 Wildlife Adventure in Ranthambore",
      description: "Seek out the majestic Bengal tiger in one of India's most renowned national parks.",
      flight: {
        details: "The nearest airport is Jaipur International Airport (JAI), about a 3-4 hour drive away.",
        suggestion: "Combine this trip with a visit to Jaipur for a longer vacation."
      },
      accommodation: {
        name: "The Oberoi Vanyavilas",
        highlights: ["Luxury Tents", "Private Gardens", "Observation Tower", "Jungle Views"]
      },
      schedule: [
        {
          day: "Day 1: Arrival and Evening Safari",
          activities: [
            { name: "Check-in and Relax", description: "Settle into your jungle resort." },
            { name: "Evening Jeep Safari", description: "Embark on your first safari into the park to spot wildlife as the sun sets." }
          ]
        },
        {
          day: "Day 2: Tiger Spotting",
          activities: [
            { name: "Morning Jeep Safari", description: "Explore a different zone of the park in the early morning, the best time for tiger sightings." },
            { name: "Visit Ranthambore Fort", description: "Discover the historic fort within the park, offering incredible views." }
          ]
        }
      ],
      dining: [
        { name: "The Dining Room at Vanyavilas", specialty: "Multi-cuisine fine dining in a luxurious setting." },
        { name: "Manuhar", specialty: "Authentic Rajasthani cuisine at the Nahargarh Ranthambhore." }
      ]
    }
  }
];

function App() {
  const [itinerary, setItinerary] = useState(null);

  // Chat state
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [hasConversationStarted, setHasConversationStarted] = useState(false);

  useEffect(() => {
    setChatHistory([{ sender: 'bot', text: "Hello! I'm your AI Trip Planner. How can I help you? Try something like: 'A vibrant coastal escape'." }]);
    setSuggestions(itineraries.slice(0, 3));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isBotTyping]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    // Keep showing recommendations regardless of input
    setSuggestions(itineraries.slice(0, 3));
  };

  const handleSuggestionClick = (itinerary) => {
    setInput('');
    setChatHistory(prev => [...prev, { sender: 'user', text: itinerary.prompt }]);
    setHasConversationStarted(true);

    setIsBotTyping(true);
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'bot', text: "Here is a detailed plan for you:" }]);
      setItinerary(itinerary.data);
      setIsBotTyping(false);
      // Keep recommendations visible
    }, 1500);
  };

  // classic generate removed; chat drives itinerary selection

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ background: lightTheme.palette.background.paper, minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <TravelExploreIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
            <Typography variant="h2" component="h1">AI Trip Planner</Typography>
            {/* <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>Select a trip type to see a customized itinerary.</Typography> */}
          </Box>

          {/* Chat window is always visible */}

          <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', height: hasConversationStarted ? '400px' : '300px', transition: 'height 250ms ease', py: 2 }}>
              <Paper elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '16px' }}>
                <Box sx={{ flex: 1, p: 2, overflowY: 'auto', minHeight: 0 }}>
                  {chatHistory.map((msg, index) => (
                    <ChatMessage key={index} sender={msg.sender} text={msg.text} itinerary={msg.itinerary} />
                  ))}
                  {isBotTyping && <BotTypingIndicator />}
                  <div ref={chatEndRef} />
                </Box>
                <Divider />
              <Box sx={{ p: 2, backgroundColor: '#F5F5F5', flexShrink: 0 }}>
                  <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {suggestions.map(sugg => (
                      <Chip key={sugg.prompt} label={sugg.prompt} onClick={() => handleSuggestionClick(sugg)} variant="outlined" />
                    ))}
                  </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your request or choose a suggestion..."
                      value={input}
                      onChange={handleInputChange}
                    sx={{
                      '& .MuiInputBase-root': { height: 56 },
                    }}
                    />
                    <Button variant="contained" sx={{ height: '56px' }} onClick={() => { /* intentionally disabled */ }}>
                      <SendIcon />
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Container>

          {/*
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px', background: 'rgba(255, 255, 255, 0.5)', mb: 5 }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>What's your travel style?</Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {itineraries.map((item, index) => (
                  <Button
                    key={item.prompt}
                    variant={selectedIndex === index ? "contained" : "outlined"}
                    size="large"
                    onClick={() => handleGenerate(item, index)}
                    disabled={isGenerating}
                    startIcon={item.icon}
                    sx={{ borderRadius: '12px', textTransform: 'none', fontSize: '1rem' }}
                  >
                     {isGenerating && selectedIndex === index ? <CircularProgress size={24} color="inherit" /> : item.prompt}
                  </Button>
                ))}
              </Box>
            </Paper>
          */}

          {itinerary && (
            <Fade in={true} timeout={800}>
              <Box paddingTop={4}>
                 <Typography variant="h2" component="h1" align="center">{itinerary.title}</Typography>
                 <Typography variant="h6" color="text.secondary" sx={{ mt: 1, mb: 4, textAlign: 'center' }}>{itinerary.description}</Typography>
                <Grid container spacing={4}>
                   <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }} gutterBottom><FlightTakeoffIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Travel</Typography>
                        <Typography variant="body1" paragraph>{itinerary.flight.details}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Suggestion:</Typography>
                        <Typography variant="body1">{itinerary.flight.suggestion}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }} gutterBottom><HotelIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Accommodation</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{itinerary.accommodation.name}</Typography>
                        <Box sx={{ mt: 1 }}>
                          {itinerary.accommodation.highlights.map(highlight => (<Chip key={highlight} label={highlight} variant="outlined" sx={{ mr: 1, mb: 1 }} />))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom sx={{ mt: 2 }}><MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Itinerary</Typography>
                    {itinerary.schedule.map(day => (
                      <Card key={day.day} sx={{ mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h5" gutterBottom>{day.day}</Typography>
                          <Divider sx={{ my: 2 }} />
                          {day.activities.map(activity => (
                            <Box key={activity.name} sx={{ mb: 1.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{activity.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{activity.description}</Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom sx={{ mt: 2 }}><RestaurantMenuIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Dining Suggestions</Typography>
                    <Grid container spacing={2}>
                      {itinerary.dining.map(place => (
                        <Grid item xs={12} md={4} key={place.name}>
                          <Card sx={{ height: '100%' }}>
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{place.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{place.specialty}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

const ChatMessage = ({ sender, text, itinerary }) => (
  <Fade in={true}>
    <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start', flexShrink: 0 }}>
      <Avatar sx={{ bgcolor: sender === 'bot' ? 'primary.main' : '#90A4AE', mr: 1.5 }}>
        {sender === 'bot' ? <SmartToyIcon /> : <PersonIcon />}
      </Avatar>
      <Paper elevation={0} sx={{ p: 1.5, borderRadius: '12px', bgcolor: sender === 'bot' ? '#E3F2FD' : '#FFFFFF' }}>
        {text && <Typography variant="body1">{text}</Typography>}
        {itinerary && <ItineraryDisplay itinerary={itinerary} />}
      </Paper>
    </Box>
  </Fade>
);

const BotTypingIndicator = () => (
  <Box sx={{ display: 'flex', mb: 2, alignItems: 'flex-start' }}>
    <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}><SmartToyIcon /></Avatar>
    <Paper elevation={0} sx={{ p: 1.5, borderRadius: '12px', bgcolor: '#E3F2FD' }}>
      <Typography sx={{ fontStyle: 'italic' }} color="text.secondary">Generating your itinerary...</Typography>
    </Paper>
  </Box>
);

// Lightweight itinerary view for chat bubbles
const ItineraryDisplay = ({ itinerary }) => (
  <Box sx={{ mt: 0.5 }}>
    <Typography variant="h6" gutterBottom>{itinerary.title}</Typography>
    {itinerary.description && (
      <Typography variant="body2" color="text.secondary" paragraph>{itinerary.description}</Typography>
    )}
    <Card variant="outlined" sx={{ mt: 1 }}>
      <CardContent sx={{ py: 1.5 }}>
        {itinerary.flight?.suggestion && (
          <Typography sx={{ display: 'flex', alignItems: 'center' }} gutterBottom>
            <FlightTakeoffIcon sx={{ mr: 1 }} color="primary" /> <b style={{ marginRight: 4 }}>Flights:</b> {itinerary.flight.suggestion}
          </Typography>
        )}
        {itinerary.accommodation?.name && (
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            <HotelIcon sx={{ mr: 1 }} color="primary" /> <b style={{ marginRight: 4 }}>Hotel:</b> {itinerary.accommodation.name}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Box>
);

export default App;
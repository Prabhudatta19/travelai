import React, { useState, useEffect, useRef } from 'react';
import TerrainIcon from '@mui/icons-material/Terrain';
import {
  createTheme, ThemeProvider, CssBaseline, Container, Box, Button,
  Typography, CircularProgress, Card, CardContent, Grid, Paper, Fade, Divider, Chip, TextField, Avatar, LinearProgress
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
import MicIcon from '@mui/icons-material/Mic';


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
        { day: "Day 1: Arrival and Colonial Charm", activities: [{ name: "Scenic Drive to Shimla", description: "Enjoy the picturesque 3-hour drive from Chandigarh through winding mountain roads with breathtaking valley views." }, { name: "Stroll on The Mall Road", description: "Spend the evening exploring the famous Mall Road and Christ Church, soaking in the colonial architecture." }, { name: "Evening Tea at The Ridge", description: "Relax with a cup of hot tea while watching the sunset over the snow-capped Himalayas." }] },
        { day: "Day 2: Himalayan Panoramas", activities: [{ name: "Jakhoo Temple Ropeway", description: "Take the morning ropeway for stunning panoramic views of the entire Shimla valley and surrounding peaks." }, { name: "Kalka-Shimla Toy Train", description: "Experience a short, scenic ride on this UNESCO World Heritage railway through 102 tunnels and 864 bridges." }, { name: "Shopping at Lakkar Bazaar", description: "Browse through traditional wooden handicrafts and souvenirs made by local artisans." }] },
        { day: "Day 3: Nature and Adventure", activities: [{ name: "Kufri Excursion", description: "Visit the charming hill station of Kufri for horse riding and nature walks in pristine forests." }, { name: "Green Valley Photography", description: "Capture stunning photos of the lush green valleys and rolling hills." }, { name: "Local Cuisine Experience", description: "Savor authentic Himachali dishes like Siddu, Madra, and Babru at a traditional restaurant." }] },
      ],
      dining: [ { name: "The Devicos", specialty: "Multi-cuisine dining on The Mall Road." }, { name: "Cafe Sol", specialty: "Known for its continental dishes." }, { name: "Indian Coffee House", specialty: "A historic spot for a nostalgic snack." }],
      variants: {
        relaxing: {
          tips: ["Book a spa slot at the hotel", "Slow breakfast with valley views"],
          activities: ["Leisure walk at Annandale Ground"],
          dining: ["Cafe Simla Times — wood-fired pizzas"]
        },
        breathtaking: {
          tips: ["Sunrise viewpoint at Jakhoo Hill"],
          activities: ["Shimla-Kufri scenic drive"],
          dining: ["SkyBar — rooftop sundowners"]
        },
        adventurous: {
          tips: ["Pack light layers for mountain wind"],
          activities: ["Zipline at Mashobra", "Short hike to Chadwick Falls"],
          dining: ["Cafe Under Tree — fuel-up snacks"]
        },
        'pocket-friendly': {
          tips: ["Toy train short sector to save on taxis"],
          activities: ["Mall Road window shopping"],
          dining: ["Indian Coffee House — budget-friendly"]
        },
        exotic: {
          tips: ["Private heritage walk with local guide"],
          activities: ["Colonial architecture trail"],
          dining: ["Oberoi's specialty Himachali thali"]
        }
      }
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
        { day: "Day 1: North Goa Vibes", activities: [{ name: "Anjuna Flea Market", description: "Explore the vibrant market for souvenirs and local goods (Wednesdays only)." }, { name: "Sunset at Vagator Beach", description: "Witness a spectacular sunset from the cliffs near Chapora Fort." }, { name: "Beach Shacks Dinner", description: "Enjoy fresh seafood and cocktails at one of the famous beach shacks." }] },
        { day: "Day 2: Culture and Cuisine", activities: [{ name: "Explore Fontainhas", description: "Wander through the colourful Latin Quarter of Panjim with its Portuguese architecture." }, { name: "Visit Basilica of Bom Jesus", description: "A UNESCO World Heritage site holding the mortal remains of St. Francis Xavier." }, { name: "Spice Plantation Tour", description: "Learn about Goan spices and enjoy a traditional Goan lunch in a plantation setting." }] },
        { day: "Day 3: Adventure and Relaxation", activities: [{ name: "Water Sports at Calangute", description: "Try parasailing, jet skiing, or banana boat rides at one of Goa's most popular beaches." }, { name: "Old Goa Heritage Walk", description: "Explore the historic churches and monuments of Old Goa, the former Portuguese capital." }, { name: "Evening Cruise on Mandovi", description: "Take a sunset cruise along the Mandovi River with live music and Goan folk dances." }] },
      ],
      dining: [ { name: "Thalassa", specialty: "Iconic Greek taverna with stunning sunset views." }, { name: "Britto's", specialty: "A famous beach shack on Baga beach for seafood." }, { name: "The Black Sheep Bistro", specialty: "Modern, global cuisine in Panjim." }]
      ,
      variants: {
        relaxing: {
          tips: ["Choose a beach bed and unwind"],
          activities: ["Sunset cruise on Mandovi"],
          dining: ["Prana Cafe — healthy bowls"]
        },
        breathtaking: {
          tips: ["Sunrise at Chapora Fort"],
          activities: ["Butterfly Beach photo stop"],
          dining: ["Gunpowder — regional flavours"]
        },
        adventurous: {
          tips: ["Carry water shoes"],
          activities: ["Kayaking in backwaters", "Parasailing at Calangute"],
          dining: ["Fisherman's Wharf — protein-packed mains"]
        },
        'pocket-friendly': {
          tips: ["Use rideshare scooters"],
          activities: ["Local markets over boutiques"],
          dining: ["Vinayak Family Restaurant — budget seafood"]
        },
        exotic: {
          tips: ["Private yacht hour for celebrations"],
          activities: ["Hidden beach hop with guide"],
          dining: ["Aldona House pop-up tasting menu"]
        }
      }
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
        { day: "Day 1: The Pink City's Heart", activities: [{ name: "Hawa Mahal", description: "Visit the iconic 'Palace of Winds' and admire its intricate facade with 953 small windows." }, { name: "City Palace", description: "Explore the vast complex of courtyards, gardens, and buildings showcasing Rajput and Mughal architecture." }, { name: "Jantar Mantar Observatory", description: "Discover the world's largest stone sundial and other astronomical instruments built by Maharaja Jai Singh II." }] },
        { day: "Day 2: Majestic Forts", activities: [{ name: "Amber Fort", description: "Take an elephant or jeep ride up to this magnificent hilltop fort with its stunning mirror palace." }, { name: "Nahargarh Fort", description: "Enjoy panoramic city views, especially beautiful at sunset, and explore the royal hunting lodge." }, { name: "Jaigarh Fort", description: "Visit the 'Victory Fort' housing the world's largest cannon on wheels and offering spectacular views." }] },
        { day: "Day 3: Royal Heritage and Markets", activities: [{ name: "Albert Hall Museum", description: "Explore Rajasthan's oldest museum showcasing artifacts, paintings, and royal collections." }, { name: "Johari Bazaar Shopping", description: "Shop for traditional jewelry, textiles, and handicrafts in the famous gem market." }, { name: "Evening Cultural Show", description: "Enjoy traditional Rajasthani folk dances, puppet shows, and music at a heritage hotel." }] },
      ],
      dining: [ { name: "1135 AD", specialty: "Regal fine dining inside Amber Fort." }, { name: "Laxmi Misthan Bhandar (LMB)", specialty: "Famous for traditional Rajasthani sweets and vegetarian thali." }, { name: "Chokhi Dhani", specialty: "An ethnic village resort offering an authentic cultural and dining experience." }]
      ,
      variants: {
        relaxing: {
          tips: ["Afternoon chai at a haveli courtyard"],
          activities: ["Slow bazaar stroll in Johari Bazaar"],
          dining: ["Tapri — tea and snacks"]
        },
        breathtaking: {
          tips: ["Golden hour at Nahargarh ramparts"],
          activities: ["Hot-air balloon (seasonal)"] ,
          dining: ["Bar Palladio — iconic interiors"]
        },
        adventurous: {
          tips: ["Wear comfy shoes for fort climbs"],
          activities: ["Elephant village interaction", "Cycling tour in old city"],
          dining: ["Rawat — kachori fuel"]
        },
        'pocket-friendly': {
          tips: ["Combo tickets for forts"],
          activities: ["Street-food tasting walk"],
          dining: ["Lassiwala — iconic lassi"]
        },
        exotic: {
          tips: ["Private palace museum tour"],
          activities: ["Block-print workshop with artisan"],
          dining: ["Suvarna Mahal — royal dinner"]
        }
      }
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
            { name: "Ganga Aarti at Triveni Ghat", description: "Witness the mesmerizing evening prayer ceremony on the banks of the Ganges with hundreds of floating diyas." },
            { name: "Walk across Laxman Jhula", description: "Experience the iconic suspension bridge with its bustling atmosphere and stunning river views." },
            { name: "Evening Meditation by the River", description: "Join a guided meditation session on the ghats as the sun sets over the sacred Ganges." }
          ]
        },
        {
          day: "Day 2: Yoga and Adventure",
          activities: [
            { name: "Morning Yoga Session", description: "Start your day with a rejuvenating yoga class at an ashram overlooking the Ganges." },
            { name: "White Water Rafting", description: "For the adventurous, experience the thrilling rapids of the Ganges with professional guides." },
            { name: "Visit Beatles Ashram", description: "Explore the abandoned ashram where The Beatles stayed in 1968, now covered in colorful murals." }
          ]
        },
        {
          day: "Day 3: Spiritual Exploration",
          activities: [
            { name: "Sunrise at Kunjapuri Temple", description: "Hike to this hilltop temple for a breathtaking sunrise view of the Himalayas and Ganges valley." },
            { name: "Ayurvedic Spa Treatment", description: "Indulge in traditional Ayurvedic therapies and massages for complete relaxation." },
            { name: "Evening Ganga Aarti at Parmarth Niketan", description: "Attend the grand evening ceremony with fire rituals and devotional songs." }
          ]
        }
      ],
      dining: [
        { name: "The Sitting Elephant", specialty: "A rooftop restaurant with stunning river views." },
        { name: "Chotiwala", specialty: "A famous, historic spot for traditional Indian meals." }
      ],
      variants: {
        relaxing: {
          tips: ["Evening meditation session by the Ganges"],
          activities: ["Ayurvedic spa treatment"],
          dining: ["Pure Soul Cafe — mindful eats"]
        },
        breathtaking: {
          tips: ["Sunrise on the ghats"],
          activities: ["Kunjapuri sunrise drive"],
          dining: ["Terrace cafes with river views"]
        },
        adventurous: {
          tips: ["Secure straps for rafting"],
          activities: ["Advanced rafting stretch", "Cliff jumping point"],
          dining: ["German Bakery — carb load"]
        },
        'pocket-friendly': {
          tips: ["Share cabs from Dehradun airport"],
          activities: ["Ashram community yoga classes"],
          dining: ["Local thali joints in Tapovan"]
        },
        exotic: {
          tips: ["Private guided ashram tour"],
          activities: ["Sound healing session"],
          dining: ["Farm-to-table retreat dinner"]
        }
      }
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
            { name: "Check-in and Relax", description: "Settle into your jungle resort and enjoy the natural surroundings." },
            { name: "Evening Jeep Safari", description: "Embark on your first safari into the park to spot wildlife as the sun sets over the Aravalli hills." },
            { name: "Wildlife Photography Workshop", description: "Learn wildlife photography techniques from expert naturalists." }
          ]
        },
        {
          day: "Day 2: Tiger Spotting",
          activities: [
            { name: "Morning Jeep Safari", description: "Explore a different zone of the park in the early morning, the best time for tiger sightings." },
            { name: "Visit Ranthambore Fort", description: "Discover the historic fort within the park, offering incredible views and rich history." },
            { name: "Nature Walk with Naturalist", description: "Take a guided nature walk to learn about the park's flora, fauna, and conservation efforts." }
          ]
        },
        {
          day: "Day 3: Extended Wildlife Experience",
          activities: [
            { name: "Full-Day Safari Experience", description: "Spend the entire day in the park with multiple safari sessions for maximum wildlife viewing." },
            { name: "Bird Watching Session", description: "Spot and identify various bird species including peacocks, kingfishers, and migratory birds." },
            { name: "Conservation Center Visit", description: "Learn about tiger conservation efforts and the park's role in wildlife protection." }
          ]
        }
      ],
      dining: [
        { name: "The Dining Room at Vanyavilas", specialty: "Multi-cuisine fine dining in a luxurious setting." },
        { name: "Manuhar", specialty: "Authentic Rajasthani cuisine at the Nahargarh Ranthambhore." }
      ],
      variants: {
        relaxing: {
          tips: ["Afternoon by the lodge pool"],
          activities: ["Nature walk near the property"],
          dining: ["Campfire dinner under the stars"]
        },
        breathtaking: {
          tips: ["Observation tower for sunrise"],
          activities: ["Photography-focused safari zone"],
          dining: ["Breakfast in the bush (lodge setup)"]
        },
        adventurous: {
          tips: ["Book back-to-back jeep slots"],
          activities: ["Full-day safari permit", "Fort trail hike"],
          dining: ["Hearty Rajasthani thali"]
        },
        'pocket-friendly': {
          tips: ["Shared safari canters"],
          activities: ["Local guide-run village walk"],
          dining: ["Roadside dhaba lunch spot"]
        },
        exotic: {
          tips: ["Private naturalist for bespoke drive"],
          activities: ["Exclusive zone booking if available"],
          dining: ["Wine-paired tasting at the lodge"]
        }
      }
    }
  }
];

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [activeFilter, setActiveFilter] = useState(''); // '', relaxing, breathtaking, adventurous, pocket-friendly, exotic
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);

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
        <Container maxWidth="xl" sx={{ py: 5 }}>
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
                    {suggestions.map(sugg => {
                      let icon = null;
                      if (sugg.prompt.toLowerCase().includes('mountain')) icon = <TerrainIcon sx={{ mr: 0.5 }} />;
                      else if (sugg.prompt.toLowerCase().includes('coastal')) icon = <KitesurfingIcon sx={{ mr: 0.5 }} />;
                      else if (sugg.prompt.toLowerCase().includes('royal')) icon = <CastleIcon sx={{ mr: 0.5 }} />;
                      return (
                        <Chip
                          key={sugg.prompt}
                          label={<Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}{sugg.prompt}</Box>}
                          onClick={() => handleSuggestionClick(sugg)}
                          variant="outlined"
                        />
                      );
                    })}
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
                    InputProps={{
                      endAdornment: (
                        <MicIcon sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }} />
                      ),
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
            <Fade in={true} timeout={800} key={`itinerary-${itinerary.title}-${activeFilter}-${isApplyingFilter ? 'loading' : 'ready'}`}>
              <Box paddingTop={4}>
                {/* Filter buttons */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                  {['relaxing','breathtaking','adventurous','pocket-friendly','exotic'].map((f) => (
                    <Button key={f} variant={activeFilter === f ? 'contained' : 'outlined'} size="small" sx={{ textTransform: 'none', borderRadius: '12px' }} onClick={() => {
                      setIsApplyingFilter(true);
                      setActiveFilter(f);
                      setTimeout(() => setIsApplyingFilter(false), 350);
                    }}>
                      {f}
                    </Button>
                  ))}
                  {activeFilter && (
                    <Button variant="text" size="small" sx={{ textTransform: 'none' }} onClick={() => {
                      setIsApplyingFilter(true);
                      setActiveFilter('');
                      setTimeout(() => setIsApplyingFilter(false), 300);
                    }}>Clear</Button>
                  )}
                </Box>

                {isApplyingFilter && (
                  <Box sx={{ mb: 2 }}>
                    <LinearProgress />
                  </Box>
                )}
                 <Typography variant="h2" component="h1" align="center" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700 }}>{itinerary.title}</Typography>
                 <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5, mb: 3, textAlign: 'center', fontSize: { xs: '0.95rem', md: '1rem' } }}>{itinerary.description}</Typography>
                
                {/* Filter results at the top */}
                {activeFilter && itinerary.variants?.[activeFilter] && (
                  <Card sx={{ 
                    mb: 3, 
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(79, 172, 254, 0.3)',
                    border: 'none',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 25px 50px rgba(79, 172, 254, 0.4)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <CardContent sx={{ p: 2.25 }}>
                      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, mb: 2 }}>
                        {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Focus
                      </Typography>
                      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>Tips</Typography>
                        <Box sx={{ mt: 1 }}>
                          {itinerary.variants[activeFilter].tips.map(t => (
                            <Chip 
                              key={t} 
                              label={t} 
                              sx={{ 
                                mr: 1, 
                                mb: 1, 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                }
                              }} 
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>Activities</Typography>
                        <Box sx={{ mt: 1 }}>
                          {itinerary.variants[activeFilter].activities.map(a => (
                            <Chip 
                              key={a} 
                              label={a} 
                              sx={{ 
                                mr: 1, 
                                mb: 1, 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                }
                              }} 
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
              <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>Dining</Typography>
                        <Box sx={{ mt: 1 }}>
                          {itinerary.variants[activeFilter].dining.map(d => (
                            <Chip 
                              key={d} 
                              label={d} 
                              sx={{ 
                                mr: 1, 
                                mb: 1, 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                }
                              }} 
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}

                {/* Itinerary at the top */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" gutterBottom sx={{ fontSize: '1.35rem' }}><MapIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Itinerary</Typography>
                  {itinerary.schedule.map(day => (
                    <Card key={day.day} sx={{ 
                      mb: 3, 
                      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      boxShadow: '0 15px 35px rgba(168, 237, 234, 0.3)',
                      border: 'none',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 40px rgba(168, 237, 234, 0.4)',
                        transition: 'all 0.3s ease'
                      }
                    }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50', fontSize: '1.15rem' }}>{day.day}</Typography>
                        <Divider sx={{ my: 1.5, borderColor: 'rgba(44, 62, 80, 0.2)' }} />
                        {day.activities.map(activity => (
                          <Box key={activity.name} sx={{ mb: 1.25, p: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '8px' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', mb: 0.25, fontSize: '1rem' }}>{activity.name}</Typography>
                            <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.55 }}>{activity.description}</Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                   <Grid item xs={12} sm={6} md={5}>
                    <Card sx={{ 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                      border: 'none',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease'
                      }
                    }}>
                      <CardContent sx={{ p: 2.25 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1.1rem' }} gutterBottom>
                            <FlightTakeoffIcon sx={{ mr: 1.5, color: 'white' }} /> Travel
                          </Typography>
                          <Button variant="contained" size="small" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 600 }} startIcon={<SendIcon sx={{ color: 'primary.main' }} />}>Book</Button>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ opacity: 0.9, lineHeight: 1.5, mb: 1 }}>{itinerary.flight.details}</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.95rem' }}>Suggestion:</Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '0.95rem' }}>{itinerary.flight.suggestion}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={5}>
                    <Card sx={{ 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      color: 'white',
                      boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)',
                      border: 'none',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 25px 50px rgba(240, 147, 251, 0.4)',
                        transition: 'all 0.3s ease'
                      }
                    }}>
                      <CardContent sx={{ p: 2.25 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1.1rem' }} gutterBottom>
                            <HotelIcon sx={{ mr: 1.5, color: 'white' }} /> Accommodation
                          </Typography>
                          <Button variant="contained" size="small" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 600 }} startIcon={<MapIcon sx={{ color: 'primary.main' }} />}>Map</Button>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>{itinerary.accommodation.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip label="4.7 ★" sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, mr: 1 }} size="small" />
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>Top rated</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.5, mb: 1.5, fontSize: '0.95rem' }}>
                          Experience luxury and comfort with world-class amenities and exceptional service.
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.95rem' }}>Highlights:</Typography>
                        <Box sx={{ mt: 0.5 }}>
                          {itinerary.accommodation.highlights.map(highlight => (
                            <Chip 
                              key={highlight} 
                              label={highlight} 
                              sx={{ 
                                mr: 1, 
                                mb: 1, 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                }
                              }} 
                              size="small"
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom sx={{ mt: 1.5, fontSize: '1.35rem' }}><RestaurantMenuIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Dining Suggestions</Typography>
                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                      {itinerary.dining.map(place => (
                        <Grid item xs={12} sm={6} md={4} key={place.name}>
                          <Card sx={{ 
                            height: '100%', 
                            background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                            boxShadow: '0 15px 35px rgba(252, 182, 159, 0.3)',
                            border: 'none',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 20px 40px rgba(252, 182, 159, 0.4)',
                              transition: 'all 0.3s ease'
                            }
                          }}>
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2c3e50', fontSize: '1rem' }}>{place.name}</Typography>
                                <Button variant="contained" size="small" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }} startIcon={<MapIcon />}>Map</Button>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Chip label="4.5 ★" sx={{ bgcolor: 'rgba(255,255,255,0.7)', color: '#2c3e50', fontWeight: 600, mr: 1 }} size="small" />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>Popular</Typography>
                              </Box>
                              <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>{place.specialty}</Typography>
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
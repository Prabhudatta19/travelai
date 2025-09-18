import React, { useState } from 'react';
import {
  createTheme, ThemeProvider, CssBaseline, Container, Box, Button,
  Typography, CircularProgress, Card, CardContent, Grid, Paper, Fade, Divider, Chip
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import CastleIcon from '@mui/icons-material/Castle';


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
  }
];

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleGenerate = (selectedItinerary, index) => {
    setSelectedIndex(index);
    setIsGenerating(true);
    setItinerary(null);
    setTimeout(() => {
      setItinerary(selectedItinerary.data);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ background: lightTheme.palette.background.paper, minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <TravelExploreIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
            <Typography variant="h2" component="h1">AI Trip Planner</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>Select a trip type to see a customized itinerary.</Typography>
          </Box>

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

          {itinerary && (
            <Fade in={true} timeout={800}>
              <Box>
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

export default App;
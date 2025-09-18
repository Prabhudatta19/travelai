import React, { useState } from 'react';
import {
  createTheme, ThemeProvider, CssBaseline, Container, Box, TextField, Button,
  Typography, CircularProgress, Card, CardContent, Grid, Paper, Fade
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// 1. CREATE A CUSTOM THEME FOR A "STATE OF THE ART" LOOK
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00A6FF', // A vibrant blue for accents
    },
    background: {
      default: '#0D1117', // A deep, github-like dark
      paper: '#161B22',   // A slightly lighter dark for cards
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#7D8590',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Use our new font
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
  },
});

// This is our "fake" AI response.
const itineraryData = {
  title: "🏔️ Your Relaxing Weekend Escape to Shimla",
  description: "A classic Queen of the Hills, Shimla offers colonial charm, stunning Himalayan views, and a cool, pleasant climate perfect for a quick escape.",
  flight: {
    from: "New Delhi (DEL)",
    to: "Chandigarh (IXC) with a scenic 3-hour taxi ride.",
  },
  accommodation: {
    name: "The Oberoi Cecil, Shimla",
    reason: "Heritage luxury hotel with stunning valley views for a truly relaxing experience.",
  },
  activities: [
    { title: "Stroll on The Mall Road", description: "Enjoy the colonial architecture and browse local shops." },
    { title: "Kalka-Shimla Toy Train", description: "Take a short, picturesque journey for a unique experience." },
    { title: "Jakhoo Temple Ropeway", description: "Visit for a panoramic view of the Himalayas." },
  ],
};

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setItinerary(null);
    setTimeout(() => {
      setItinerary(itineraryData);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    // 2. APPLY THE THEME TO THE ENTIRE APP
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* This resets CSS for consistency */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <TravelExploreIcon sx={{ fontSize: '2.5rem', mr: 2, color: 'primary.main' }} />
          <Typography variant="h3" component="h1">
            AI Trip Planner
          </Typography>
        </Box>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Describe your perfect trip and let AI handle the details.
        </Typography>

        <Paper elevation={8} sx={{ p: 3, background: 'rgba(22, 27, 34, 0.8)', borderRadius: '12px', backdropFilter: 'blur(10px)', mb: 6 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="e.g., A weekend getaway in the mountains in India"
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleGenerate}
              disabled={isGenerating}
              sx={{
                minWidth: '150px',
                height: '56px',
                fontWeight: 'bold',
                // 3. ADD A GRADIENT AND SUBTLE EFFECTS TO THE BUTTON
                background: 'linear-gradient(45deg, #00A6FF 30%, #0072FF 90%)',
                boxShadow: '0 3px 5px 2px rgba(0, 166, 255, .3)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {isGenerating ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
            </Button>
          </Box>
        </Paper>

        {itinerary && (
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>{itinerary.title}</Typography>
              <Typography variant="body1" color="text.secondary" paragraph>{itinerary.description}</Typography>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ borderRadius: '12px', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}><FlightTakeoffIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Flights</Typography>
                      <Typography variant="body2" mt={1}><b>From:</b> {itinerary.flight.from}</Typography>
                      <Typography variant="body2"><b>To:</b> {itinerary.flight.to}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ borderRadius: '12px', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}><HotelIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Accommodation</Typography>
                      <Typography variant="body2" mt={1}><b>Hotel:</b> {itinerary.accommodation.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h3" gutterBottom mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <MapIcon sx={{ mr: 1.5, color: 'primary.main' }} /> Activities
                  </Typography>
                  <Grid container spacing={2}>
                    {itinerary.activities.map((activity, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Paper elevation={2} sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
                          <Typography variant="subtitle1"><b>{activity.title}</b></Typography>
                          <Typography variant="body2" color="text.secondary">{activity.description}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
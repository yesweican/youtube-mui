import { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Box, Drawer, IconButton, CssBaseline, AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { TextField } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, LibraryBooks, VideoLibrary, PostAdd, SmartDisplay, LiveTv, MovieCreation, Settings as  SettingsIcon, AccountCircle as ProfileIcon, Group as GroupIcon} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';

// Import your content components
import Home from './Home';
import SubscriptionVideos from './SubscriptionVideos.js';
import ChannelDisplay from './ChannelDisplay.js'; 
import ChannelEdit from './ChannelEdit.js'; 
import VideoSearch from './VideoSearch.js';
import MyVideos from './MyVideos.js';
import VideoPopular from './VideoPopular.js';    
import NewArticle from './NewArticle.js';
import MyArticles from './MyArticles.js';
import NewVideo from './NewVideo.js';
import NewChannel from './NewChannel.js';
import MyChannels from './MyChannels.js';
import NewComment from './NewComment.js';
import Profile from './Profile.js';
import Groups from './Groups.js';
import Settings from './Settings.js';
import RegistrationPage from './RegistrationPage';
import Login from './Login';
import VideoDisplay from './VideoDisplay.js'; 
import VideoEdit from './VideoEdit.js'; 
import Error404 from './Error404.js';
const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 120;
const mainLeftMargin = 20;

function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogInDialog, setShowLogInDialog] = useState(false);

  const clickLogIn = () => setShowLogInDialog(true);
  const clickLogOut = () => setIsLoggedIn(false);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    console.log(`Login successful! Welcome, ${user.username}`);
  };


  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate(`/videosearch?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };


  const clickRegister = () => {
    navigate('/register');
  };  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

       {/* Cross-Section Header */}
       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            App Header
          </Typography>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: '320px',
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'lightgray',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray',
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>

          </Box>
          <Box>
            {isLoggedIn === false && <Button color="inherit" onClick={clickLogIn}>LogIn</Button>}  
            {isLoggedIn === false && <Button color="inherit" onClick={clickRegister}>CreateAccount</Button>}
            {isLoggedIn === true && <Button color="inherit">Profile</Button>}  
            {isLoggedIn === true && <Button color="inherit" onClick={clickLogOut}>LogOut</Button>}              
          </Box>
        </Toolbar>
      </AppBar>


      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={!isCollapsed}
        sx={
          {
          width: `${isCollapsed ? drawerWidthCollapsed : drawerWidthExpanded}px`,
          '& .MuiDrawer-paper': {
            width: `${isCollapsed ? drawerWidthCollapsed : drawerWidthExpanded}px`,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',           
          },
        }}
      >
        <Toolbar /> {/* Spacer to offset the header */}
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          
          {/* Sidebar Menu Items */}
          <Box sx={{ padding: 2 }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              <Link to="/Home" className="text-left p-2 hover:bg-gray-700 rounded-md">
              <div>
              <HomeIcon />Home
              </div>
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer', mb: 1 }}
          >
              <Link to="/subsvideos" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <LibraryBooks /> Subscription Videos
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/videosearch" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <SearchIcon /> Video Search
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/myvideos" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <VideoLibrary /> My Videos
              </Link>
          </Typography>          
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/videopopular" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <VideoLibrary /> Video Popular
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/newvideo" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <MovieCreation />New Video
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/newarticle" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <PostAdd />New Article
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/myarticles" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <PostAdd />My Articles
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/newchannel" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <SmartDisplay />New Channel
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/mychannels" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <LiveTv />My Channels
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/groups" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <GroupIcon />Groups
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/profile" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <ProfileIcon />Profile
              </Link>
          </Typography>
          <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
          >
              <Link to="/settings" className="text-left p-2 hover:bg-gray-700 rounded-md">
                <SettingsIcon /> Settings
              </Link>
          </Typography>        
          </Box>
        </Box>


      </Drawer>

      {/* Main Content with Conditional Rendering */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,          
          marginLeft: `${mainLeftMargin}px`,
          transition: 'margin-left 0.3s ease',          
        }}
      >
          <Toolbar /> {/* Spacer to offset the header */}
          <Container maxWidth="lg">
            <Routes>
              {/* Default route that redirects to /component1 */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/subsvideos" element={<SubscriptionVideos />} />
              <Route path="/channel/:id" element={<ChannelDisplay />} />
              <Route path="/channeledit/:id" element={<ChannelEdit />} />               
              <Route path="/myvideos" element={<MyVideos />} />
              <Route path="/videosearch" element={<VideoSearch />} />
              <Route path="/videopopular" element={<VideoPopular />} />
              <Route path="/newvideo" element={<NewVideo />} />
              <Route path="/newarticle" element={<NewArticle />} />
              <Route path="/myarticles" element={<MyArticles />} />
              <Route path="/newchannel" element={<NewChannel />} /> 
              <Route path="/mychannels" element={<MyChannels />} />              
              <Route path="/newcomment" element={<NewComment />} />
              <Route path="/video/:id" element={<VideoDisplay />} />
              <Route path="/videoedit/:id" element={<VideoEdit />} />                                        
              <Route path="/profile" element={<Profile />} />
              <Route path="/groups" element={<Groups />} />              
              <Route path="/settings" element={<Settings />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="*" element={<Error404 />} />
            </Routes>          
          </Container>
          <div>
            <Login
              open={showLogInDialog}
              onClose={() => setShowLogInDialog(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          </div> 
      </Box>
    </Box>
  );
}

export default Layout;

import { Box, Paper, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../theme';
import Header from '../Header';
import ChartsTheme from './ChartsTheme';




const ImageChart = ({imageName, height, title, subtitle}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartsTheme, chartsEmotionColors] = ChartsTheme();

  const imageDir = "/Images/";

  const Image = () => {
    return (
      <img class="captured-image" src={imageDir + imageName} alt="Captured Image" />
    )
  }
    
    
    
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: colors.primary[900],
        p: 2,
        borderRadius: "6px",
        background: `linear-gradient(45deg, ${colors.primary[700]}, ${colors.purplePinkAccent[800]})`
      }}
      m="20px"
    >
      <Header title={title} subtitle={subtitle} titleAlign='center'></Header>
      <Box height={height}>
        <Image />
      </Box>
    </Paper>
  )
}
    
export default ImageChart;
    
import { Box, Paper, useTheme, Grid, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { tokens } from '../../theme';
import Header from '../Header';
import ChartsTheme from './ChartsTheme';




const AudioChart = ({mode, audioNames, height, title, subtitle}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartsTheme, chartsEmotionColors] = ChartsTheme();

  const audioDir = "/Audio/";

  const Audio = () => {
    return (
      <Grid container spacing={1} sx={{p:0}}>
        <Grid item xs={3} sx={{px:1, py:2, overflow: "hidden", textOverflow: "ellipsis"}}>
          <Typography noWrap variant="h3" align="center" sx={{ p:1, pt: 2 }}>
            Audio 1:
          </Typography>
        </Grid>
        <Grid item xs={9} sx={{px:1, py:2}}>
          <audio controls>
            <source src={audioDir + mode + "_audio_" + audioNames[0] + ".mp3"} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Grid>
        <Grid item xs={3} sx={{px:1, py:2, overflow: "hidden", textOverflow: "ellipsis"}}>
          <Typography noWrap variant="h3" align="center" sx={{ p:1, pt: 2 }}>
            Audio 2:
          </Typography>
        </Grid>
        <Grid item xs={9} sx={{px:1, py:2}}>
          <audio controls>
            <source src={audioDir + mode + "_audio_" + + audioNames[1] + ".mp3"} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Grid>
        <Grid item xs={3} sx={{px:1, py:2, overflow: "hidden", textOverflow: "ellipsis"}}>
          <Typography noWrap variant="h3" align="center" sx={{ p:1, pt: 2 }}>
            Audio 3:
          </Typography>
        </Grid>
        <Grid item xs={9} sx={{px:1, py:2}}>
          <audio controls>
            <source src={audioDir + mode + "_audio_" + + audioNames[2] + ".mp3"} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Grid>
      </Grid>
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
      <Box height={height} sx={{mt: 3, mb: 0}}>
        <Audio />
      </Box>
    </Paper>
  )
}
    
export default AudioChart;
    
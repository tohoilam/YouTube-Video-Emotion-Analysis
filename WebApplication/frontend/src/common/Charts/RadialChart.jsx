import { Box, Paper, useTheme } from '@mui/material';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { tokens } from '../../theme';
import Header from '../Header';
import ChartsTheme from './ChartsTheme';



// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RadialChart = ({data, height, title, subtitle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartsTheme, chartsEmotionColors] = ChartsTheme();

  const Radial = () => {
    return (
        <ResponsiveRadialBar
            data={data}
            colors={chartsEmotionColors}
            theme={chartsTheme}
            valueFormat=" >-.2f"
            padding={0.4}
            cornerRadius={2}
            margin={{ top: 30, right: 120, bottom: 20, left: 40 }}
            enableCircularGrid={false}
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
            enableLabels={false}
            labelsTextColor={{ theme: 'labels.text.fill' }}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 80,
                    translateY: 0,
                    itemsSpacing: 6,
                    itemDirection: 'left-to-right',
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'square',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
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
        <Radial />
      </Box>
    </Paper>
  )
}
    
export default RadialChart;
    
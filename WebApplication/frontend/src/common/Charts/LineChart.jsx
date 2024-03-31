import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line'
import Header from '../Header';
import ChartsTheme from './ChartsTheme';

const data1 = [
  {
    "id": "Emotion Amplitude",
    "color": "hsl(111, 70%, 50%)",
    "data": [
      {
        "x": "1",
        "y": 113
      },
      {
        "x": "2",
        "y": 71
      },
      {
        "x": "3",
        "y": 38
      },
      {
        "x": "4",
        "y": 29
      },
      {
        "x": "5",
        "y": 173
      },
      {
        "x": "6",
        "y": 132
      },
      {
        "x": "7",
        "y": 29
      },
      {
        "x": "8",
        "y": 30
      },
      {
        "x": "9",
        "y": 25
      },
      {
        "x": "10",
        "y": 41
      },
    ]
  }
];
const data2 = [
  {
    "id": "Emotion Amplitude",
    "color": "hsl(111, 70%, 50%)",
    "data": [
      {
        "x": "1",
        "y": 20
      },
      {
        "x": "2",
        "y": 50
      },
      {
        "x": "3",
        "y": 80
      },
      {
        "x": "4",
        "y": 50
      },
      {
        "x": "5",
        "y": 20
      },
      {
        "x": "6",
        "y": 50
      },
      {
        "x": "7",
        "y": 80
      },
      {
        "x": "8",
        "y": 50
      },
      {
        "x": "9",
        "y": 50
      },
      {
        "x": "10",
        "y": 50
      },
    ]
  }
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({mode}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartsTheme, chartsEmotionColors] = ChartsTheme();

  return (
    <ResponsiveLine
        data={(mode === "1") ? data1 : data2}
        theme={chartsTheme}
        margin={{ top: 15, right: 10, bottom: 10, left: 10 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        lineWidth={3}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default LineChart;

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
        "y": 36.26
      },
      {
        "x": "2",
        "y": 62.1
      },
      {
        "x": "3",
        "y": 74.75
      },
      {
        "x": "4",
        "y": 49.42
      },
      {
        "x": "5",
        "y": 52.81
      },
      {
        "x": "6",
        "y": 34.66
      },
      {
        "x": "7",
        "y": 32.13
      },
      {
        "x": "8",
        "y": 34.79
      },
      {
        "x": "9",
        "y": 94.28
      },
      {
        "x": "10",
        "y": 51.09
      },
      {
        "x": "11",
        "y": 49.55
      },
      {
        "x": "12",
        "y": 85.41
      },
      {
        "x": "13",
        "y": 42.30
      },
      {
        "x": "14",
        "y": 45.94
      },
      {
        "x": "15",
        "y": 79.30
      },
      {
        "x": "16",
        "y": 79.19
      },
      {
        "x": "17",
        "y": 56.46
      },
      {
        "x": "18",
        "y": 33.71
      },
      {
        "x": "19",
        "y": 31.36
      },
      {
        "x": "20",
        "y": 39.31
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

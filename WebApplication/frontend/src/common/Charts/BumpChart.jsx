import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ResponsiveBump } from '@nivo/bump'
import ChartsTheme from './ChartsTheme';

const data1 = [
    {
      "id": "Anger",
      "data": [
        {
          "x": 2000,
          "y": 11
        },
        {
          "x": 2001,
          "y": 12
        },
        {
          "x": 2002,
          "y": 5
        },
        {
          "x": 2003,
          "y": 3
        },
        {
          "x": 2004,
          "y": 7
        }
      ]
    },
    {
      "id": "Fear",
      "data": [
        {
          "x": 2000,
          "y": 8
        },
        {
          "x": 2001,
          "y": 10
        },
        {
          "x": 2002,
          "y": 9
        },
        {
          "x": 2003,
          "y": 7
        },
        {
          "x": 2004,
          "y": 8
        }
      ]
    },
    {
      "id": "Disgust",
      "data": [
        {
          "x": 2000,
          "y": 10
        },
        {
          "x": 2001,
          "y": 9
        },
        {
          "x": 2002,
          "y": 1
        },
        {
          "x": 2003,
          "y": 4
        },
        {
          "x": 2004,
          "y": 3
        }
      ]
    },
    {
      "id": "Sadness",
      "data": [
        {
          "x": 2000,
          "y": 9
        },
        {
          "x": 2001,
          "y": 5
        },
        {
          "x": 2002,
          "y": 12
        },
        {
          "x": 2003,
          "y": 9
        },
        {
          "x": 2004,
          "y": 12
        }
      ]
    },
    {
      "id": "Neutral",
      "data": [
        {
          "x": 2000,
          "y": 5
        },
        {
          "x": 2001,
          "y": 6
        },
        {
          "x": 2002,
          "y": 6
        },
        {
          "x": 2003,
          "y": 12
        },
        {
          "x": 2004,
          "y": 10
        }
      ]
    },
    {
      "id": "Happiness",
      "data": [
        {
          "x": 2000,
          "y": 7
        },
        {
          "x": 2001,
          "y": 4
        },
        {
          "x": 2002,
          "y": 8
        },
        {
          "x": 2003,
          "y": 6
        },
        {
          "x": 2004,
          "y": 9
        }
      ]
    },
    {
      "id": "Surprise",
      "data": [
        {
          "x": 2000,
          "y": 12
        },
        {
          "x": 2001,
          "y": 3
        },
        {
          "x": 2002,
          "y": 2
        },
        {
          "x": 2003,
          "y": 11
        },
        {
          "x": 2004,
          "y": 2
        }
      ]
    },
  ]
const data2 = [
    {
      "id": "Anger",
      "data": [
        {
          "x": 2000,
          "y": 1
        },
        {
          "x": 2001,
          "y": 12
        },
        {
          "x": 2002,
          "y": 5
        },
        {
          "x": 2003,
          "y": 3
        },
        {
          "x": 2004,
          "y": 7
        }
      ]
    },
    {
      "id": "Fear",
      "data": [
        {
          "x": 2000,
          "y": 2
        },
        {
          "x": 2001,
          "y": 10
        },
        {
          "x": 2002,
          "y": 9
        },
        {
          "x": 2003,
          "y": 7
        },
        {
          "x": 2004,
          "y": 8
        }
      ]
    },
    {
      "id": "Disgust",
      "data": [
        {
          "x": 2000,
          "y": 3
        },
        {
          "x": 2001,
          "y": 9
        },
        {
          "x": 2002,
          "y": 1
        },
        {
          "x": 2003,
          "y": 4
        },
        {
          "x": 2004,
          "y": 3
        }
      ]
    },
    {
      "id": "Sadness",
      "data": [
        {
          "x": 2000,
          "y": 4
        },
        {
          "x": 2001,
          "y": 5
        },
        {
          "x": 2002,
          "y": 12
        },
        {
          "x": 2003,
          "y": 9
        },
        {
          "x": 2004,
          "y": 12
        }
      ]
    },
    {
      "id": "Neutral",
      "data": [
        {
          "x": 2000,
          "y": 5
        },
        {
          "x": 2001,
          "y": 6
        },
        {
          "x": 2002,
          "y": 6
        },
        {
          "x": 2003,
          "y": 12
        },
        {
          "x": 2004,
          "y": 10
        }
      ]
    },
    {
      "id": "Happiness",
      "data": [
        {
          "x": 2000,
          "y": 6
        },
        {
          "x": 2001,
          "y": 4
        },
        {
          "x": 2002,
          "y": 8
        },
        {
          "x": 2003,
          "y": 6
        },
        {
          "x": 2004,
          "y": 9
        }
      ]
    },
    {
      "id": "Surprise",
      "data": [
        {
          "x": 2000,
          "y": 7
        },
        {
          "x": 2001,
          "y": 3
        },
        {
          "x": 2002,
          "y": 2
        },
        {
          "x": 2003,
          "y": 11
        },
        {
          "x": 2004,
          "y": 2
        }
      ]
    },
  ]

const BumpChart = ({mode}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [chartsTheme, chartsEmotionColors] = ChartsTheme();

    return (
        <ResponsiveBump
            data={(mode === "1") ? data1 : data2}
            colors={chartsEmotionColors}
            theme={chartsTheme}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            endLabel={false}
            endLabelPadding={6}
            pointSize={0}
            activePointSize={0}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            enableGridX={false}
            axisTop={null}
            axisBottom={null}
            axisLeft={null}
            margin={{ top: 15, right: 10, bottom: 10, left: 10 }}
            axisRight={null}
        />
    )
    // }
}

export default BumpChart;
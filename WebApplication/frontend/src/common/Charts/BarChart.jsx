import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ResponsiveBar } from '@nivo/bar';
import ChartsTheme from './ChartsTheme';
import { useEffect } from 'react';

const data1 = [
    {
        "Modality": "Image",
        "Anger": 9.69,
        "Fear": 1.20,
        "Disgust": 8.77,
        "Sadness": 26.26,
        "Neutral": 19.84,
        "Happiness": 30.62,
        "Surprise": 3.62,
    },
    {
        "Modality": "Audio",
        "Anger": 2.32,
        "Fear": 5.89,
        "Disgust": 1.61,
        "Sadness": 13.68,
        "Neutral": 33.77,
        "Happiness": 9.26,
        "Surprise": 33.47,
    },
    {
        "Modality": "Text",
        "Anger": 10.29,
        "Fear": 11.37,
        "Disgust": 8.61,
        "Sadness": 15.34,
        "Neutral": 29.03,
        "Happiness": 17.14,
        "Surprise": 8.22,
    },
]

const data2 = [
    {
      "Modality": "Image",
      "Anger": 9.31,
      "Fear": 6.24,
      "Disgust": 3.29,
      "Sadness": 2.38,
      "Neutral": 76.57,
      "Happiness": 0.83,
      "Surprise": 1.38,
    },
    {
        "Modality": "Audio",
        "Anger": 32.29,
        "Fear": 3.92,
        "Disgust": 4.66,
        "Sadness": 6.13,
        "Neutral": 27.48,
        "Happiness": 3.29,
        "Surprise": 22.23,
    },
    {
      "Modality": "Text",
      "Anger": 13.28,
      "Fear": 4.92,
      "Disgust": 1.49,
      "Sadness": 2.70,
      "Neutral": 74.94,
      "Happiness": 1.82,
      "Surprise": 0.85,
    },
]

const BarChart = ({mode}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [chartsTheme, chartsEmotionColors] = ChartsTheme();

    return (
        <ResponsiveBar
            data={(mode === "1") ? data1 : data2}
            colors={chartsEmotionColors}
            theme={chartsTheme}
            keys={[
                "Anger",
                "Fear",
                "Disgust",
                "Sadness",
                "Neutral",
                "Happiness",
                "Surprise",
            ]}
            indexBy="Modality"
            margin={{ top: 20, right: 100, bottom: 60, left: 50 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Type of Modality',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />

    )
    // }
}

export default BarChart;
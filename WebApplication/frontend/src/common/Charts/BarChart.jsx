import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ResponsiveBar } from '@nivo/bar';
import ChartsTheme from './ChartsTheme';
import { useEffect } from 'react';

const data1 = [
    {
      "Modality": "Image",
      "Anger": 14,
      "Fear": 14,
      "Disgust": 14,
      "Sadness": 14,
      "Neutral": 14,
      "Happiness": 14,
      "Surprise": 16,
    },
    {
        "Modality": "Audio",
        "Anger": 14,
        "Fear": 14,
        "Disgust": 14,
        "Sadness": 14,
        "Neutral": 14,
        "Happiness": 14,
        "Surprise": 16,
    },
    {
      "Modality": "Text",
      "Anger": 14,
      "Fear": 14,
      "Disgust": 14,
      "Sadness": 14,
      "Neutral": 14,
      "Happiness": 14,
      "Surprise": 16,
    },
]

const data2 = [
    {
      "Modality": "Image",
      "Anger": 0,
      "Fear": 0,
      "Disgust": 0,
      "Sadness": 0,
      "Neutral": 0,
      "Happiness": 50,
      "Surprise": 50,
    },
    {
        "Modality": "Audio",
        "Anger": 14,
        "Fear": 14,
        "Disgust": 14,
        "Sadness": 14,
        "Neutral": 14,
        "Happiness": 14,
        "Surprise": 16,
    },
    {
      "Modality": "Text",
      "Anger": 50,
      "Fear": 50,
      "Disgust": 0,
      "Sadness": 0,
      "Neutral": 0,
      "Happiness": 0,
      "Surprise": 0,
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
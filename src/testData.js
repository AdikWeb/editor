export const layersDataTest = {
    background: 'https://cdn.myanimelist.net/s/common/uploaded_files/1450943087-a35fa949ae29d1bc78eca3d772be4fbd.png',
    strokeWidth: 1,
    strokeColor: 'green',
    fillColor: 'red',
    fill: false,
    dotsFill: true,
    dotsFillColor: 'black',
    dotsStrokeColor: 'red',
    dotsStrokeWidth: 1,
    dotsRad: 5,
    dotsVisible: true,
    layers: [
        {
            figure: 'polygon',
            id: Date.now(),
            visible: true,
            strokeWidth: 1,
            strokeColor: 'red',
            fillColor: 'rgba(0,0,0,0.5)',
            fill: true, //! Заливать если фигура закрытая
            // fillClosed: true,
            dotsFill: true,
            dotsFillColor: 'black',
            dotsStrokeColor: 'black',
            dotsStrokeWidth: 1,
            dotsRad: 5,
            dotsVisible: true,
            closed: true,
            path: [{
                x: 70,
                y: 70,
                dotsRad: 10,
                dotsStrokeColor: 'red',
            },
            {
                x: 80,
                y: 70,
            },
            {
                x: 80,
                y: 80,
            },
            {
                x: 70,
                y: 80,
            },
            {
                x: 70,
                y: 70,
            }]
        }
    ]
}

export const tmpLayerDataTest = {
    figure: 'polygon',
    id: Date.now(),
    visible: true,
    strokeWidth: 1,
    strokeColor: 'red',
    fillColor: 'rgba(0,0,0,0.5)',
    fill: true, //! Заливать если фигура закрытая
    // fillClosed: true,
    dotsFill: true,
    dotsFillColor: 'red',
    dotsStrokeColor: 'black',
    dotsStrokeWidth: 1,
    dotsRad: 5,
    dotsVisible: true,
    closed: true,
    path: [{
        x: 40,
        y: 40,
        dotsRad: 10,
        dotsStrokeColor: 'red',
    },
    {
        x: 20,
        y: 40,
    },
    {
        x: 20,
        y: 30,
    },
    {
        x: 10,
        y: 20,
    },
    {
        x: 10,
        y: 10,
    }]
}
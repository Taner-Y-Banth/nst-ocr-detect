import { Typography } from '@mui/material';

export default function Home() {

    return (

        <>
            <Typography
                textAlign='center'
                fontSize='xxx-large'
                fontFamily='Segoe Ui'
                color='white'
                borderBottom='solid'
                borderColor='#5c597c'
            >
                Coral Detections and Nstrumenta
            </Typography>
            <Typography
                fontSize='xx-large'
                fontFamily='Segoe Ui'
                margin={2}
                color='white'
            >
                Purpose
            </Typography>
            <Typography
                textAlign='left'
                fontSize='x-large'
                fontFamily='Segoe Ui'
                margin={2}
            >
                A react app that sends an image on the 'preprocessing' channel by using the webcam of a given device and taking a photo at an interval, defined by user input, or when a button is pressed. This website also contains a viewer that pulls from the data on nstrumenta.com. The photos that are taken go through a detection algorithm on the coral dev board which are then displayed in the viewer. The filter function allows you to only save the photos which contain, with above 50% asurity, only the images that contains a given label.
            </Typography>
            <Typography
                fontSize='xx-large'
                fontFamily='Segoe Ui'
                margin={2}
                color='white'
            >
                Use
            </Typography>
            <Typography
                textAlign='left'
                fontSize='x-large'
                fontFamily='Segoe Ui'
                margin={2}
            >
                Using the Camera Sender you can take photos with a set interval or a button, capture photo. The switch button changes from the front to the back camera on a phone.
            </Typography>
            <Typography
                fontSize='xx-large'
                fontFamily='Segoe Ui'
                margin={2}
                color='white'
            >
                Connections
            </Typography>
            <Typography
                textAlign='left'
                fontSize='x-large'
                fontFamily='Segoe Ui'
                margin={2}
            >
            </Typography>
        </>
    )
}
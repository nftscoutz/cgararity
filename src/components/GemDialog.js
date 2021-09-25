import { Dialog, Typography } from '@material-ui/core'
import React from 'react'
import GemCard from './GemCard'

export default function GemDialog(props) {

    const getData = (tokenId) => {
        const result = props.images.filter(item => item['TOKEN ID'] === tokenId)
        return result[0]
    }

    const handleClose = (e) => {
        props.handlesearchClose()
    }

    if (props.isNotFound) {
        return (
            <Dialog onClose={handleClose} open={props.open}>
                <Typography>Sorry gem not found.</Typography>
            </Dialog>
        )
    }

    return (
        <Dialog onClose={handleClose} open={props.open}>
            {(props.open ? (
                <GemCard gem={props.gem} image={getData(props.gem['TOKEN ID']).image} />
            ) : (<></>))}
        </Dialog>
    )
}
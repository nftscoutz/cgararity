import { Card, CardContent, CardHeader, CardMedia, Grid, Link, Typography } from '@material-ui/core'
import React from 'react'

export default function GemCard(props) {
    const { gem } = props
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={gem.RANK}
                subheader={gem['NFT NAME']}
            />
            <CardMedia
                component="img"
                height="300"
                image={props.image}
            />
            <CardContent>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography>Carats: {gem.CARATS}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Tier: {gem.TIER}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography>Cut: {gem.CUT}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Type: {gem.TYPE}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography>Distortion: {gem.DISTORTION}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Scratches: {gem.SCRATCHES}</Typography>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: '10px'}} container spacing={0}>
                    <Grid item xs={12}>
                        <Typography><Link href={gem.LINK} target="_blank" underline="always">Interactive Link</Link></Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
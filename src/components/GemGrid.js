import React, { useState, useEffect } from 'react'
import GemCard from './GemCard'
import { Grid } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

export default function GemGrid(props) {
    const pageSize = 20;

    const byRank = (a, b) => {
        if (a.RANK < b.RANK) {
            return -1
        }
        if (a.RANK > b.RANK) {
            return 1
        }
        return 0
    }

    const [ page, setPage ] = useState(1)
    const [ paginated, setPaginated ] = useState([])


    const getData = (tokenId) => {
        const result = props.images.filter(item => item['TOKEN ID'] === tokenId)
        return result[0]
    }

    const paginate = (array, size, currentPage) => {
        return array.slice((currentPage - 1) * size, currentPage * size);
    }

    useEffect(() => {
        const thisPage = paginate(props.data.sort(byRank), pageSize, 1)
        
        setPaginated(thisPage)
    }, [props.data])

    const handleChange = (event, value) => {
        setPage(value)
        const thisPage = paginate(props.data.sort(byRank), pageSize, page)
        setPaginated(thisPage)
    }

    return (
        <div style={{padding: '20px'}}>
            <Grid container spacing={2}>
                {paginated.map(gem => (
                    <Grid item key={gem['TOKEN ID']} xs={12} sm={6} md={4}>
                        <GemCard gem={gem} image={getData(gem['TOKEN ID']).image} />
                    </Grid>
                ))}
            </Grid>
            {props.data.length > pageSize ? (
                <Pagination style={{marginTop: '20px'}} count={props.data.length} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
            ) : (<></>)}
        </div>
    )
}
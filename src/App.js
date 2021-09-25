import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { Container, createTheme, makeStyles, Typography } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import MainMenu from './components/MainMenu'
import FilterBar from './components/FilterBar'
import GemGrid from './components/GemGrid'

import data from './data/QUALITY_RANKING'
import images from './data/images'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e2061'
        }
    }
})

const useStyles = makeStyles(theme => ({
    receipts: {
        fontFamily: `'Roboto Mono', monospace`
    },
    viewTitle: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    subHead: {
        marginBottom: '20px'
    }
}))

export default function App() {
    const classes = useStyles()

    const [ filteredData, setFilteredData ] = useState([])
    const [ filter, setFilter ] = useState({
        'TIER': [],
        'TYPE': [],
        'CUT': [],
        'CARATS': []
    })
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)

    useEffect(async () => {
        setFilteredData(filterData(data, buildFilter(filter)))
    }, [])

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const buildFilter = filter => {
        let query = {}
        for (let keys in filter) {
            if (filter[keys].constructor === Array && filter[keys].length > 0) {
                query[keys] = filter[keys]
            }
        }
        return query
    }

    const filterData = (data, query) => {
        const filt = data.filter(item => {
            for (let key in query) {
                if (item[key] === undefined || !query[key].includes(item[key])) {
                    return false
                }
            }
            return true
        })
        return filt
    };

    const onFilterChange = (key, value, bool) => {
        let currentfilter = filter
        const current = currentfilter[key]
        if (bool) {
            current.push(value)
        } else {
            const index = current.indexOf(value)
            current.splice(index, 1)
        }
        currentfilter[key] = current
        setFilter(currentfilter)

        setFilteredData(filterData(data, buildFilter(filter)))
    }

    return (
        <ThemeProvider theme={theme}>
            <MainMenu handleHamburgerClick={toggleDrawer} />
            <GemGrid data={filteredData} images={images} />
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
            >
                <FilterBar handleClose={toggleDrawer} handleFilterChange={onFilterChange} data={data} filter={filter} />
            </Drawer>
        </ThemeProvider>
    )
}

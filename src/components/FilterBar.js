import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, List, ListItem, ListItemIcon, Typography } from '@material-ui/core'
import { Close, ExpandMore } from '@material-ui/icons'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    close: {
        display: 'flex',
        justifyContent: 'end'
    }
}));

export default function FilterBar(props) {
    const classes = useStyles();

    const compareNumbers = (a, b) => {
        return a - b
    }
    const compareNumbersTier = (a, b) => {
        return a.substring(0, a.length - 1) - b.substring(0, b.length - 1)
    }
    const compareSale = (a, b) => {
        const aSale = a.slice(-1)
        const bSale = b.slice(-1)
        return aSale.localeCompare(bSale);
    }

    const closeClick = () => {
        props.handleClose()
    }

    const getCarats = data => {
        let sorted = [...new Set(data.map(gem => gem.CARATS))].sort(compareNumbers).reverse()

        const ranges = sorted.slice(0, 5).sort().reverse()

        sorted.splice(0, 5)

        sorted = sorted.concat(ranges)

        return sorted
    }

    const getCut = data => {
        let sorted = [...new Set(data.map(gem => gem.CUT))].sort()

        return sorted
    }
    const getTier = data => {
        let sorted = [...new Set(data.map(gem => gem.TIER))].sort(compareSale)

        const pub = sorted.slice(0, 10).sort(compareNumbersTier)
        const pre = sorted.slice(10, 15).sort()

        sorted = pre.concat(pub)

        return sorted
    }
    const getType = data => {
        let sorted = [...new Set(data.map(gem => gem.TYPE))].sort()

        return sorted
    }

    const handleCaratFilter = event => {
        props.handleFilterChange('CARATS', event.target.value, event.target.checked)
    }
    const handleCutFilter = event => {
        props.handleFilterChange('CUT', event.target.value, event.target.checked)
    }
    const handleTierFilter = event => {
        props.handleFilterChange('TIER', event.target.value, event.target.checked)
    }
    const handleTypeFilter = event => {
        props.handleFilterChange('TYPE', event.target.value, event.target.checked)
    }

    return (
        <Box>
            <div className={classes.close}>
                <IconButton color="primary" component="span" onClick={closeClick}>
                    <Close />
                </IconButton>
            </div>
            <Divider />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Carats</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {getCarats(props.data).map(carat => (
                            <FormControlLabel key={carat} control={<Checkbox onChange={handleCaratFilter} value={carat} checked={(props.filter.CARATS.indexOf(carat) !== -1) ? true : false} />} label={carat} />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Cut</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {getCut(props.data).map(cut => (
                            <FormControlLabel key={cut} control={<Checkbox onChange={handleCutFilter} value={cut} checked={(props.filter.CUT.indexOf(cut) !== -1) ? true : false} />} label={cut} />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Tier</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {getTier(props.data).map(tier => (
                            <FormControlLabel key={tier} control={<Checkbox onChange={handleTierFilter} value={tier} checked={(props.filter.TIER.indexOf(tier) !== -1) ? true : false} />} label={tier} />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography>Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {getType(props.data).map(type => (
                            <FormControlLabel key={type} control={<Checkbox onChange={handleTypeFilter} value={type} checked={(props.filter.TYPE.indexOf(type) !== -1) ? true : false} />} label={type} />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
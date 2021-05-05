import {
    Button,
    Container,
    makeStyles,
    Paper,
    Typography,
    Grid,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent, RadioGroup, FormControlLabel, Radio, DialogActions, Slider, Input, TextField, Checkbox,
} from "@material-ui/core";
import {Star, StarBorder} from '@material-ui/icons';
import {useState} from "react";
import {perActiveClientsPayout} from "../constants/Data";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        padding: theme.spacing(3, 5),
    },
    stepper: {
        padding: theme.spacing(3, 0)
    },
    navigationButtons: {
        marginTop: theme.spacing(5),
        display: "flex",
        justifyContent: "flex-end"
    },
    backNavigationButton: {
        marginRight: theme.spacing(1)
    },
    coachSelector: {
        "& div": {
            width: theme.spacing(9),
            height: theme.spacing(9),
        }
    },
    clients: {
        marginTop: theme.spacing(2)
    },
    sliderInput: {
        width: 42,
        marginLeft: theme.spacing(6),
    }
}))

export default function Home() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [coach, setCoach] = useState("junior")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [activeClients, setActiveClients] = useState(1)
    const [npsSlab, setNpsSlab] = useState(30)
    const [newSaleRev, setNewSaleRev] = useState(0)
    const [referralRev, setReferralRev] = useState(0)
    const [renewRev, setRenewRev] = useState(0)
    const [shift, setShift] = useState("")
    const [targetAchieved, setTargetAchieved] = useState(false)

    const activeClientsMarks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 50,
            label: '50',
        },
        {
            value: 100,
            label: '100',
        },
        {
            value: 150,
            label: '150',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 250,
            label: '250',
        },
        {
            value: 300,
            label: '300',
        },
    ];

    const npsSlabMarks = [3, 4, 5, 6, 7].map(e => ({
        value: e * 10,
        label: e === 7 ? `> ${e * 10}%` : `${e * 10}%`
    }))

    const handleNextSteps = () => {
        setActiveStep(activeStep + 1)
    }

    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const handleCoachSelect = (e) => {
        setCoach(e.target.value)
    }

    const handleActiveClientsSliderChange = (event, value) => {
        setActiveClients(value)
    }

    const handleActiveClientsInputChange = (event) => {
        setActiveClients(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleActiveClientsBlur = () => {
        if (activeClients < 0) {
            setActiveClients(0);
        } else if (activeClients > 300) {
            setActiveClients(300);
        }
    };

    const handleNpsSlabSliderChange = (event, value) => {
        setNpsSlab(value)
    }

    const handleNpsSlabInputChange = (event) => {
        setNpsSlab(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleNpsSlabBlur = () => {
        if (npsSlab < 30) {
            setNpsSlab(30);
        } else if (npsSlab > 70) {
            setNpsSlab(70);
        }
    }

    const handleNewSaleRevChange = (event) => {
        setNewSaleRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleReferralRevChange = (event) => {
        setReferralRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleRenewRevChange = (event) => {
        setRenewRev(event.target.value === '' ? '' : Number(event.target.value))
    }

    const handleShiftChange = (event) => {
        setShift(event.target.value)
    }

    const handleTargetReachedChange = (event) => {
        setTargetAchieved(event.target.checked)
    }

    const getClientsValueText = (value) => {
        return `${value} Clients`
    }

    const getNpsSlabValueText = (value) => {
        return `${value}%`
    }

    const clientIncentive = (clients) => perActiveClientsPayout[coach](npsSlab) * clients

    const revenueIncentive = () => ((0.15 * clientIncentive(newSaleRev)) + (0.3 * clientIncentive(referralRev)) + ((targetAchieved ? 0.2 : 0.15) * clientIncentive(renewRev)))

    return <Container maxWidth="sm" className={classes.root} component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
            Incentive Calc
        </Typography>
        <div className={classes.clients}>
            <Grid container justify="center" spacing={3}>
                <Grid id="couch-grid" item className={classes.coachSelector} container justify="center">
                    <
                        IconButton
                        onClick={handleDialogOpen}>
                        < Avatar> {coach[0].toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Grid>
                <Grid id="active-clients-grid" item container>
                    <Typography id="active-clients" align="justify" gutterBottom>
                        {`Active Clients ( ₹${clientIncentive(activeClients)} )`}
                    </Typography>
                    <Grid item xs={12} container>
                        <Grid item xs>
                            <Slider
                                defaultValue={1}
                                value={typeof activeClients === 'number' ? activeClients : 0}
                                getAriaValueText={getClientsValueText}
                                aria-labelledby="active-clients"
                                valueLabelDisplay="auto"
                                onChange={handleActiveClientsSliderChange}
                                min={1}
                                max={300}
                                marks={activeClientsMarks}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={classes.sliderInput}
                                value={activeClients}
                                margin="dense"
                                onChange={handleActiveClientsInputChange}
                                onBlur={handleActiveClientsBlur}
                                inputProps={{
                                    step: 1,
                                    min: 1,
                                    max: 300,
                                    type: 'number',
                                    'aria-labelledby': 'active-clients',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid id="nps-slab-grid" item container>
                    <Typography id="nps-slab" gutterBottom>
                        NPS Slab
                    </Typography>
                    <Grid item xs={12} container>
                        <Grid item xs>
                            <Slider
                                defaultValue={30}
                                value={typeof npsSlab === 'number' ? npsSlab : 0}
                                getAriaValueText={getNpsSlabValueText}
                                aria-labelledby="nps-slab"
                                valueLabelDisplay="auto"
                                onChange={handleNpsSlabSliderChange}
                                min={30}
                                max={70}
                                marks={npsSlabMarks}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                className={classes.sliderInput}
                                value={npsSlab}
                                margin="dense"
                                onChange={handleNpsSlabInputChange}
                                onBlur={handleNpsSlabBlur}
                                inputProps={{
                                    step: 10,
                                    min: 10,
                                    max: 100,
                                    type: 'number',
                                    'aria-labelledby': 'active-clients',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid id="revenue-grid" item container>
                    <Grid item xs={12} container justify="space-between">
                        <Typography id="revenue-label" gutterBottom display="inline">
                            {`Revenue ${revenueIncentive() ? `( ₹${revenueIncentive()} )` : ""}`}
                        </Typography>
                        <FormControlLabel
                            control={<Checkbox icon={<StarBorder/>} checkedIcon={<Star/>} name="checkedH"/>}
                            label="Target Reached"
                            onChange={handleTargetReachedChange}
                        />
                    </Grid>
                    <Grid item container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                id="new-sales-revenue"
                                label="New Sales"
                                inputProps={{
                                    type: 'number',
                                    'aria-labelledby': 'active-clients',
                                }}
                                value={newSaleRev === 0 ? "" : newSaleRev}
                                onChange={handleNewSaleRevChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="referral-revenue"
                                label="Referral"
                                inputProps={{
                                    type: 'number',
                                    'aria-labelledby': 'active-clients',
                                }}
                                value={referralRev === 0 ? "" : referralRev}
                                onChange={handleReferralRevChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="renewal-revenue"
                                label="Renewal"
                                inputProps={{
                                    type: 'number',
                                    'aria-labelledby': 'active-clients',
                                }}
                                value={renewRev === 0 ? "" : renewRev}
                                onChange={handleRenewRevChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid id="shift-grid" item xs={12}>
                    <Typography id="shift-label" gutterBottom>
                        Shift
                    </Typography>
                    <RadioGroup aria-label="shift" name="shift" row value={shift} onChange={handleShiftChange}>
                        <FormControlLabel value="shift1" control={<Radio/>} label="shift1"/>
                        <FormControlLabel value="shift2" control={<Radio/>} label="shift2"/>
                        <FormControlLabel value="shift3" control={<Radio/>} label="shift3"/>
                        <FormControlLabel value="shift4" control={<Radio/>} label="shift4"/>
                    </RadioGroup>
                </Grid>
            </Grid>
        </div>
        <div className={
            classes.navigationButtons
        }
        >
            <
                Button
                variant="contained"
                color="primary"
                onClick={handleNextSteps}>
                Calculate
            < /Button>
        </div>
        <Dialog
            open={
                dialogOpen
            }
            onClose={handleDialogClose}
        >
            < DialogTitle
                id="select-coach"> Select
                coach
                level < /DialogTitle>
            <DialogContent>
                <RadioGroup name="coach" value={coach} onChange={handleCoachSelect}>
                    <FormControlLabel value="junior" control={<Radio/>} label="Junior"/>
                    <FormControlLabel value="senior" control={<Radio/>} label="Senior"/>
                    <FormControlLabel value="master" control={<Radio/>} label="Master"/>
                    <FormControlLabel value="principle" control={<Radio/>} label="Principle"/>
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleDialogClose}>
                    Select
                </Button>
            </DialogActions>
        </Dialog>
    </Container>;
}

import {
    Button,
    Container,
    makeStyles,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
    Grid,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent, RadioGroup, FormControlLabel, Radio, DialogActions, Slider,
} from "@material-ui/core";
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(3)
    },
    stepper: {
        padding: theme.spacing(3, 0)
    },
    navigationButtons: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "flex-end"
    },
    backNavigationButton: {
        marginRight: theme.spacing(1)
    },
    clients: {
        marginTop: theme.spacing(2)
    },
    coachSelector: {
        "& div": {
            width: theme.spacing(9),
            height: theme.spacing(9),
        }
    }
}))

const steps = ["Clients", "Revenue", "Testimonials", "Shift"]

export default function Home() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [coach, setCoach] = useState("junior")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [activeClients, setActiveClients] = useState(0)

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

    const getClients = (value) => {
        return `${value} Clients`
    }

    return <Container maxWidth="sm" className={classes.root} component={Paper}>
        <Typography variant="h4" align="center">
            Incentive Calc
        </Typography>
        <div className={classes.clients}>
            <Grid container>
                <Grid item xs={12} className={classes.coachSelector} container justify="center"
                >
                    <
                        IconButton
                        onClick={handleDialogOpen}>
                        < Avatar> {coach[0].toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Grid>
                <Grid item container justify="center" xs={12}>
                    <Grid item xs={12}>
                        <Slider
                            defaultValue={0}
                            getAriaValueText={getClients}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={300}
                        />
                    </Grid>
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
    </Container>
}
